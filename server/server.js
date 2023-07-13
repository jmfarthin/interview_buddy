const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./util/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const multer = require('multer');
const axios = require('axios');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    
});

app.post('/api/voice', upload.single('audio'), async (req, res) => {
    try {
      const audioFilePath = req.file.path;
  
      // Call Whisper API to convert audio to text
      const response = await axios.post(
        'https://api.openai.com/v1/engines/whisper/mimic-asr',
        { audio: { file: audioFilePath } },
        { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
      );
  
      const text = response.data.choices[0].text;
      
      // Now you can call your GraphQL mutation to save the text message
      // ...  
  
      res.json({ message: 'Voice processed', text: text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error processing voice' });
    }
  });

  app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donate 10 Dollars to the Dev Team ',
              // add any other product details here
            },
            unit_amount: 1000, // the price you want to charge, e.g., $20.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
  
    res.json({ id: session.id });
  });


// new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    // server.applyMiddleware({ app, path: '/graphql' });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// start the server
startApolloServer(typeDefs, resolvers);


