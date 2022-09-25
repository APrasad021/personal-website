import '../styles/globals.css'
import { AppProps } from 'next/app';
import NavBarWrapper from '../components/NavBar';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NavBarWrapper>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </NavBarWrapper>
    </div>
  );
}

export default App;
