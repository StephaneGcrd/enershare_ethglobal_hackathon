import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from './useTokenContract';

function getTokenBalance(contract) {
  return async (_: string, address: string) => {
    const balance = await contract.balanceOf(address);

    return balance;
  };
}

export default function useTokenBalance(address: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof address === 'string' && !!contract;

  const result = useSWR(shouldFetch ? ['TokenBalance', address] : null, getTokenBalance(contract), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
