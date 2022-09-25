import NavBarWrapper from "../components/NavBar";
import Head from "next/head";

import styles from "../styles/links.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ashwin Prasad</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Hello, welcome to my shared space" />
        <meta property="og:title" content="Ashwin Prasad" />
        <meta
          property="og:description"
          content="Hello, welcome to my shared space"
        />
        <meta property="og:url" content="https://ashwinprasad.dev/" />
        <meta property="og:type" content="website" />
      </Head>
    </div>
  );
}
