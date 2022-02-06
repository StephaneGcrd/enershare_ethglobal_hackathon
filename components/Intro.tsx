import React from 'react';
import { Box } from '@chakra-ui/react';

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
        Builder: Stéphane Guichard, Jan. 2022
        <br />
        <br />
      </Box>
    </>
  );
};
