//import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'theme/theme';

import type { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

type Props = {
  Component: React.ElementType;
  pageProps: React.Props<unknown>;
};

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
