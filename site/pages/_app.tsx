import App from 'next/app';
import Head from 'next/head';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from 'next-with-apollo';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';

import { styletron, debug } from '../styletron';

interface Props {
  apollo: ApolloClient<any>;
}

class Site extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <>
        <Head>
          <title>Beloved Pacifist</title>
        </Head>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={LightTheme}>
            <ApolloProvider client={apollo}>
              <Component {...pageProps} />
            </ApolloProvider>
          </BaseProvider>
        </StyletronProvider>
      </>
    );
  }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache().restore(initialState || {})
  });
})(Site);