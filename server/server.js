const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const User = require('./models/User');
const { authMiddleware } = require('./util/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const http = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { promisify } = require('util');
const { PubSub } = require('graphql-subscriptions');

const userRoutes = require('./routes/userRoutes');  // path to your userRoutes file

const pubsub = new PubSub();
const app = express();
const PORT = process.env.PORT || 3001;

// Create http server first
const httpServer = http.createServer(app);

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      const token = connectionParams.authorization ? connectionParams.authorization.split(' ').pop().trim() : null;
      if (token) {
        console.log("Received token: ", token);
        return validateToken(token)
          .then(() => Promise.resolve(User.findUser(token)))
          .then((user) => {
            console.log("User from token: ", user);
            return {
              currentUser: user,
            };
          });
      }
      throw new Error('Missing auth token!');
    },
  },
  pubsub,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the userRoutes router for all paths that start with /api
app.use('/api', userRoutes);

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start Apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  db.once('open', async () => {
    await promisify(httpServer.listen.bind(httpServer))(PORT);
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: httpServer,
        path: server.graphqlPath,
      },
    );
  });
};

startApolloServer(typeDefs, resolvers);