import React from 'react';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import useTokenBalance from 'hooks/useTokenBalance';
import { formatEther } from 'ethers/lib/utils';
import { Box } from '@chakra-ui/react';
import useTokenSupply from 'hooks/useTokenSupply';
import useTokenTreasurery from 'hooks/useTokenTreasurery';

export const Reward = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: balance } = useTokenBalance(account as string);
  const { data: supply } = useTokenSupply(account as string);
  const { data: treasurery } = useTokenTreasurery(account as string);

  if (!balance || !supply) {
    return <div>...</div>;
  }

  const ratio = parseFloat(formatEther(balance)) / parseFloat(formatEther(supply));

  return (
    <Box textStyle="p">
      You own <Box display="inline">{ratio * 100} %</Box> of the project. You have the right to
      claim {ratio * 100} % of {parseFloat(formatEther(treasurery))} ETH.
      {/*       ({parseFloat(formatEther(balance)) / 100} % of the bike) */}
    </Box>
  );
};
