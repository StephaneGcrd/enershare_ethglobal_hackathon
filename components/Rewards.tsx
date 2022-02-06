import React, { useState } from 'react';
import { Box, Button, useToast, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import useRewards from 'hooks/useRewards';
import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

import { ethers } from 'ethers';
import useTokenBalance from 'hooks/useTokenBalance';
import useTokenSupply from 'hooks/useTokenSupply';
import { formatEther } from 'ethers/lib/utils';
import useTokenContract from 'hooks/useTokenContract';
import useTxReceipt from 'hooks/useTxReceipt';
import useRewardClaimed from 'hooks/useRewardClaimed';

const RewardBox = ({ id, reward, ratio }: any) => {
  if (!reward) return null;

  const { data: auth } = useRewardClaimed(id as string);

  const { amount } = { ...reward };
  return (
    <Box
      border="1px solid grey"
      borderRadius={4}
      px={4}
      py={4}
      mr={2}
      boxShadow=" 0px 5px 5px rgba(0,0,0,0.1)"
    >
      <Box fontWeight="bold">Reward available 🎉</Box>

      <Box pt={2}>Electricity produced: 20GWh ⚡️</Box>
      <Box>CO2 Saved: 1.5 kg 🌿</Box>
      <Box pb={2}>Total reward left: {ethers.utils.formatUnits(amount, 18)} ETH</Box>
      <Box>
        {ratio === 0 ? (
          <>
            <Button disabled variant="outlined">
              Claim your share
            </Button>
            <Box>You need tokens to claim benefits</Box>
          </>
        ) : (
          <>
            {auth ? (
              <Button disabled variant="outlined">
                Reward already claimed
              </Button>
            ) : (
              <ClaimReward _id={id}>
                Claim your reward: {(ratio * parseFloat(formatEther(amount))).toFixed(7)} ETH
              </ClaimReward>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export const ClaimReward = ({ children, _id }) => {
  const contract = useTokenContract();
  const toast = useToast();

  const [txHash, setTxHash] = useState(null);

  const { data: receipt } = useTxReceipt(txHash || null);

  if (receipt && receipt.status == 1) {
    toast({
      title: 'Transaction done.',
      description:
        'The transaction has been send to the blockchain. Once the block is mined, the website will automatically update',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setTxHash(null);
  }

  const buyToken = async () => {
    if (!contract) return;
    setTxHash(null);
    const tx = await contract.claimReward(_id);
    setTxHash(tx.hash);

    toast({
      title: 'Transaction send.',
      description:
        'The transaction has been send to the blockchain. Once the block is mined, the website will automatically update',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Button onClick={buyToken} variant="outlined">
      {txHash ? <Spinner size="sm" /> : children}
    </Button>
  );
};

export const Rewards = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: rewards } = useRewards(account as string);
  const { data: balance } = useTokenBalance(account as string);
  const { data: supply } = useTokenSupply(account as string);

  if (!balance || !supply) {
    return <div>...</div>;
  }

  const ratio = parseFloat(formatEther(balance)) / parseFloat(formatEther(supply));

  if (!rewards) return null;

  return (
    <Box width="100%" maxWidth="820px">
      <Box display="flex" my={4} overflow="scroll">
        {rewards.map((reward, id) => (
          <RewardBox key={id} id={id} reward={reward} ratio={ratio} />
        ))}
      </Box>
      <Alert width="100%">
        <AlertIcon />
        Once the project produces energy, it can be sold via our smart-contract. Revenues generated
        by the energy transaction will be available as a reward.
      </Alert>
      <Alert width="100%" mt={2} status="success">
        <AlertIcon />
        Rewards can then be claimed by asset owners. When you claim a reward, a share of the reward
        corresponding to the owned equity (in token) will be distributed to you.
      </Alert>
    </Box>
  );
};
