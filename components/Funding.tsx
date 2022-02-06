import React from 'react';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import { formatEther } from 'ethers/lib/utils';
import { Box, Progress } from '@chakra-ui/react';
import useTokenSupply from 'hooks/useTokenSupply';

import useCirculatingSupply from 'hooks/useCirculatingSupply';

export const Funding = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: circulatingSupply } = useCirculatingSupply(account as string);
  const { data: supply } = useTokenSupply(account as string);

  if (!circulatingSupply || !supply) {
    return <div>...</div>;
  }

  const ratio = parseFloat(formatEther(circulatingSupply)) / parseFloat(formatEther(supply));

  return (
    <Box>
      <Progress hasStripe value={ratio * 100} />
      <Box textStyle="p">{ratio * 100} % of the equity has been sold</Box>
    </Box>
  );
};
