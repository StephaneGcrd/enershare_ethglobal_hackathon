import React, { useState } from 'react';
import useTokenContract from 'hooks/useTokenContract';
import { ethers } from 'ethers';
import { Button, useToast, Spinner } from '@chakra-ui/react';
import useTxReceipt from 'hooks/useTxReceipt';

export const Sell = () => {
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

  const sellToken = async () => {
    if (!contract) return;
    setTxHash(null);
    const tx = await contract.sell(ethers.utils.parseUnits('100', 18));
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
    <Button onClick={sellToken} variant="outlined">
      {txHash ? <Spinner size="sm" /> : 'Deposit 100 Tokens'}
    </Button>
  );
};
