import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from './useTokenContract';

function getRewardAuth(contract) {
  return async (_: string, id: string) => {
    const rewards = await contract.getClaimAuth(id);

    return rewards;
  };
}

export default function useRewardClaimed(id: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof id === 'number';

  const result = useSWR(shouldFetch ? ['RewardAuth', id] : null, getRewardAuth(contract), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
