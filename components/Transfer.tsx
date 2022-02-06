import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input } from '@chakra-ui/react';
import { ethers } from 'ethers';
import useTokenContract from 'hooks/useTokenContract';

export const Transfer = () => {
  const { register, handleSubmit } = useForm();
  const contract = useTokenContract();

  const sendToken = async (data) => {
    if (!contract) return;
    await contract.transfer(data.address, ethers.utils.parseUnits(data.amount, 18));
  };

  return (
    <Box display="flex" alignItems="center">
      <Box textStyle="p" mr={2}>
        Transfer tokens
      </Box>
      <form onSubmit={handleSubmit(sendToken)}>
        <Input {...register('address')} placeholder="Address 0x000" width="300px" mr={2} />
        <Input {...register('amount')} placeholder="amount" width="200px" type="number" mr={2} />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </form>
    </Box>
  );
};
