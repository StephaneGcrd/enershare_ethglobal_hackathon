import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from 'hooks/useKeepSWRDataLiveAsBlocksArrive';

import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';

function getTokenReceipt(library) {
  return async (_: string, hash: string) => {
    const receipt = await library.getTransactionReceipt(hash);

    return receipt;
  };
}

export default function useTxReceipt(hash, suspense = false) {
  const { library } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library && hash;

  const result = useSWR(shouldFetch ? ['TokenReceipt', hash] : null, getTokenReceipt(library), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
