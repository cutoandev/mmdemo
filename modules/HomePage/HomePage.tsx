import * as React from 'react';
import { ExtendableComponentProps } from 'shared/components/common';
import classes from './HomePage.module.scss';
import { hooks, metaMask } from 'shared/services/connectors/metamask';
import { useGetBalanceOf } from 'shared/hooks/web3/useGetBalanceOf';
import { Asset } from 'shared/types/asset';
import { useInterval } from 'shared/hooks/common/useInterval';
import { MiniCard } from 'shared/components/MiniCard';

type Props = ExtendableComponentProps<'div'>;
const { useAccounts, useIsActive, useProvider } = hooks;

export function HomePage(_props: Props): React.ReactElement {
  const accounts = useAccounts();
  const isActive = useIsActive();
  const provider = useProvider();
  const { data: dataAmounts, refetch } = useGetBalanceOf(accounts, provider);

  const refetchAmount = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const { clear } = useInterval(refetchAmount, 2000);

  React.useEffect((): (() => void) => {
    void metaMask.connectEagerly();
    return () => clear;
  }, []);

  React.useEffect(() => {
    void refetch();
  }, [accounts, refetch]);

  React.useEffect(() => {
    console.log(dataAmounts);
  }, [dataAmounts]);

  const connectHandler = React.useCallback(() => {
    if (isActive) return;
    void metaMask.activate(25);
  }, [isActive]);

  return (
    <div className={classes['homepage-container']}>
      <div className={classes['content']}>
        <p className={classes['im-text']}>Hi, I&#x27;m Toan 🤘</p>
        <h2 className={classes['title']}>Building web3 demo app...</h2>
        <div className={classes['connect-me']}>
          {
            <button onClick={connectHandler} className={classes['btn-connect']}>
              {!isActive ? 'CONNECT WITH YOUR METAMASK WALLET' : accounts?.[0]}
            </button>
          }
        </div>
        <div className={classes['asset']}>
          {dataAmounts?.map((a: Asset, index: number) => (
            <MiniCard key={index} name={a.name} text={a.amount} />
          ))}
        </div>
      </div>
    </div>
  );
}
