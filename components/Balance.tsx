import React from 'react';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import useTokenBalance from 'hooks/useTokenBalance';
import { formatEther } from 'ethers/lib/utils';
import { Box } from '@chakra-ui/react';

export const Balance = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: balance } = useTokenBalance(account as string);

  if (!balance) {
    return <div>...</div>;
  }
  return (
    <Box textStyle="p">
      Your balance: <Box display="inline">{formatEther(balance)} tokens</Box>{' '}
      {/*       ({parseFloat(formatEther(balance)) / 100} % of the bike) */}
    </Box>
  );
};
