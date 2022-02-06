import React from 'react';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import useTokenSupply from 'hooks/useTokenSupply';
import { formatEther } from 'ethers/lib/utils';
import { Box } from '@chakra-ui/react';

export const Supply = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: supply } = useTokenSupply(account as string);

  if (!supply) {
    return <div>...</div>;
  }
  return (
    <Box textStyle="p">
      Max supply: <Box display="inline">{formatEther(supply)} tokens</Box>
    </Box>
  );
};
