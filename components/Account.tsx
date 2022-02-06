import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import { injected } from 'connectors';
import useMetaMaskOnboarding from 'hooks/useMetaMaskOnboarding';
import { Button, Box } from '@chakra-ui/react';

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, account, setError } = useWeb3React();

  const { isMetaMaskInstalled, isWeb3Available, startOnboarding, stopOnboarding } =
    useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== 'string') {
    return (
      <div>
        {isWeb3Available ? (
          <Button
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet'}
          </Button>
        ) : (
          <Button onClick={startOnboarding}>Install Metamask</Button>
        )}
      </div>
    );
  }

  if (account) {
    return <Box>Your address: {account}</Box>;
  }

  return null;
};

export default Account;
