import { Asset } from 'shared/types/asset';
import Web3 from 'web3';
import assets from 'config/assets.json';
import erc20 from 'config/erc20.json';
import { BigNumber } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { Web3ReactHooks } from '@web3-react/core';

export const getBalance = async function getBalance(
  accounts: string[] | undefined | null,
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
): Promise<Asset[]> {
  if (accounts && accounts?.length > 0 && provider) {
    const web3 = new Web3();
    web3.setProvider('https://evm.cronos.org');
    const resultData = Promise.all([
      ...accounts.map(async (account) => {
        const dBalance = await provider.getBalance(account);
        return {
          name: 'CRO',
          amount: formatEther(dBalance),
        };
      }),
      ...assets.map(async (asset) => {
        const contract = new web3.eth.Contract(erc20 as any, asset.addr);
        const tokenBalance = await contract?.methods?.balanceOf(accounts?.[0]).call();
        const bigNum = BigNumber.from(tokenBalance);
        return {
          name: asset.name,
          amount: formatUnits(bigNum, asset.decimal),
        };
      }),
    ]);
    return resultData;
  }

  return Promise.resolve([]);
};
