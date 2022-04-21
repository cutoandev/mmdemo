import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export type UseAppQueryResult<Response> = UseQueryResult<Response>;

export function useAppQuery<Key extends QueryKey = QueryKey, Response = unknown, SelectData = Response>(
  options: UseQueryOptions<Response, Error, SelectData, Key> = {},
): UseAppQueryResult<SelectData> {
  return useQuery<Response, Error, SelectData, Key>({
    retry: false,
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    onError(error) {
      () => console.log(error);
    },
    ...options,
  });
}
