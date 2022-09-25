import { useEffect } from "react";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import NavBarWrapper from "../components/NavBar";
import * as ga from "../util/ga";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NavBarWrapper>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </NavBarWrapper>
    </div>
  );
}

export default App;
