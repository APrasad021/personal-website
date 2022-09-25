import NavBarWrapper from '../components/NavBar';
import Head from 'next/head';

import styles from "../styles/links.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
          <title>Ashwin Prasad</title>
      </Head>
    </div>
      
  )
}