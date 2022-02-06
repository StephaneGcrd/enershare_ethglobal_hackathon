import React from 'react';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import { formatEther } from 'ethers/lib/utils';
import { Box } from '@chakra-ui/react';
import useTokenTreasurery from 'hooks/useTokenTreasurery';

export const Treasurery = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: treasurery } = useTokenTreasurery(account as string);

  if (!treasurery) {
    return <div>...</div>;
  }
  return (
    <Box textStyle="p">
      Total treasurery: <Box display="inline">{formatEther(treasurery)} ETH</Box>
    </Box>
  );
};
