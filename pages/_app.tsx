import '../styles/globals.css'
import { AppProps } from 'next/app';
import NavBarWrapper from '../components/NavBar';

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      <NavBarWrapper>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </NavBarWrapper>
    </div>
  );
}

export default App;
