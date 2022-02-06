import React from 'react';
import { Box, Link as Clink } from '@chakra-ui/react';
import Link from 'next/link';

export const Intro = () => {
  return (
    <>
      <Box maxWidth="820px" textStyle="h1" pb={2}>
        Welcome to enershare Proof of Concept.
      </Box>
      <Box maxWidth="820px" textStyle="h2">
        This app can demonstrate how one can use blockchain to make renewable energy assets more
        accessible. It has been made as part of the ETH Road to Web3 Hackaton.
        <br />
        Builder:{' '}
        <Clink borderBottom="1px solid black">
          <Link href="https://stephane.guichard.co">Stéphane Guichard</Link>
        </Clink>
        , Feb. 2022
        <br />
        <br />
      </Box>
    </>
  );
};
