import { split, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import authService from './utils/auth';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = authService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: authService.getToken() ? `Bearer ${authService.getToken()}` : "",
    },
  }
});

const splitLink = ApolloLink.from([
  authLink,
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ),
]);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;