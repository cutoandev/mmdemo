import * as React from 'react';
import { ExtendableComponentProps } from 'shared/components/common';
import { Header } from '../Header';
import classes from './MainLayout.module.scss';

type Props = ExtendableComponentProps<'div'>;

export function MainLayout({ children, ...rest }: Props): React.ReactElement {
  return (
    <main className={classes['main-layout']} {...rest}>
      <Header />
      <div className={classes['wao-container']}>{children}</div>
    </main>
  );
}
