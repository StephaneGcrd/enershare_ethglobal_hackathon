import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from 'hooks/useTokenContract';

function getTokenTreasurery(contract) {
  return async (_: string) => {
    const balance = await contract.treasurery();

    return balance;
  };
}

export default function useTokenTreasurery(address: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof address === 'string' && !!contract;

  const result = useSWR(
    shouldFetch ? ['TokenTreasurery', address] : null,
    getTokenTreasurery(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
