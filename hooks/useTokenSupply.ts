import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from 'hooks/useTokenContract';

function getTokenSupply(contract) {
  return async (_: string) => {
    const balance = await contract.totalSupply();

    return balance;
  };
}

export default function useTokenSupply(address: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof address === 'string' && !!contract;

  const result = useSWR(shouldFetch ? ['TokenSupply', address] : null, getTokenSupply(contract), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
