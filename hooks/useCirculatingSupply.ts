import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from 'hooks/useTokenContract';

function getTokenCirculatingSupply(contract) {
  return async (_: string) => {
    const balance = await contract.circulatingSupply();

    return balance;
  };
}

export default function useCirculatingSupply(address: string, suspense = false) {
  const contract = useTokenContract();

  const shouldFetch = typeof address === 'string' && !!contract;

  const result = useSWR(
    shouldFetch ? ['TokenCirculatingSupply', address] : null,
    getTokenCirculatingSupply(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
