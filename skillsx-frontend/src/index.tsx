import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { userAccessToken } from './cache';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: userAccessToken(),
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, new HttpLink({ uri: 'http://localhost:4002/graphql' })),
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
