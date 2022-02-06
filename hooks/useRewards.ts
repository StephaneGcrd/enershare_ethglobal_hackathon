import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from './useTokenContract';

function getRewards(contract) {
  return async (_: string) => {
    const rewards = await contract.getRewards();

    return rewards;
  };
}

export default function useRewards(address: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof address === 'string' && !!contract;

  const result = useSWR(shouldFetch ? ['Rewards', address] : null, getRewards(contract), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
