import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MainLayout } from 'shared/layouts';
import { QueryClient, QueryClientProvider } from 'react-query';

// Import style
// import '../shared/styles/tailwind.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Wao: MM Demo App</title>
        <meta charSet="UTF-8" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
