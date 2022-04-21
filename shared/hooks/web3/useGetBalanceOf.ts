import { Web3ReactHooks } from '@web3-react/core';
import { getBalance } from 'shared/services/web3/getBalance';
import { Asset } from 'shared/types/asset';
import { useAppQuery, UseAppQueryResult } from '../common/useAppQuery';

export const GET_ERC20_BALANCE_OF = 'GET_ERC20_BALANCE_OF';

type UseGetBalanceOfResult = Pick<
  UseAppQueryResult<Asset[]>,
  'data' | 'error' | 'status' | 'isSuccess' | 'refetch' | 'isFetching'
>;

export function useGetBalanceOf(
  accounts: string[] | undefined | null,
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
): UseGetBalanceOfResult {
  const { data, status, error, isSuccess, refetch, isFetching } = useAppQuery<typeof GET_ERC20_BALANCE_OF, Asset[]>({
    queryKey: GET_ERC20_BALANCE_OF,
    queryFn() {
      return getBalance(accounts, provider);
    },
  });
  return { data, status, error, isSuccess, refetch, isFetching };
}
