import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./views/App";
import { BrowserRouter } from "react-router-dom";
import "./static/general.css";


const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});


const ApolloApp = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
