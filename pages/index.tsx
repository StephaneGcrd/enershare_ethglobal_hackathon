import Head from 'next/head';
import { Box, Image } from '@chakra-ui/react';

import Account from 'components/Account';
import useEagerConnect from 'hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import { Balance } from 'components/Balance';
import { Supply } from 'components/Supply';

import { Buy } from 'components/Buy';

import { Funding } from 'components/Funding';
import { Rewards } from 'components/Rewards';
import { Intro } from 'components/Intro';
import { AddTreasurery } from 'components/AddTreasurery';

function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === 'string' && !!library;

  return (
    <>
      <Head>
        <title>Enershare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        width="100%"
        height="150vh"
        bg="lightGreen"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Intro />
          <Account triedToEagerConnect={triedToEagerConnect} />
          {isConnected && (
            <Box
              bg="white"
              px={4}
              py={4}
              borderRadius={8}
              boxShadow=" 0px 20px 25px rgba(0,0,0,0.1)"
            >
              <Box display="flex" width="100%" justifyContent="space-between" pb={4}>
                <Box textStyle="p" fontWeight="bold">
                  Copenhagen offshore wind farm
                </Box>
              </Box>
              <Box maxHeight="200px" overflow="hidden" mb={2} borderRadius="4px ">
                <Image src="pictures/windfarm.jpeg" alt="Dan Abramov" />
              </Box>

              <Funding />
              <Box mb={2}>
                <Buy />
              </Box>
              <Box>
                <Box textStyle="h3" mb={2}>
                  Investor panel
                  <hr />
                </Box>

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Box>
                    <Balance />
                    {/* <Supply /> */}
                    <Rewards />
                  </Box>
                </Box>
              </Box>
              {/*               <Box>
                <Box textStyle="p" mb={2}>
                  Admin panel
                  <hr />
                </Box>
                <Treasurery />
                <AddTreasurery />
              </Box> */}

              {/*  <Transfer /> */}
            </Box>
          )}
        </Box>
      </Box>
      <Box textStyle="h1">Admin panel</Box>
      <AddTreasurery />
    </>
  );
}

export default Home;
