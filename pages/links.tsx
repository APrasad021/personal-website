import client from "../util/apollo-client";
import { GET_PAGE_QUERY } from "../util/queries";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

import styles from "../styles/links.module.css";

export default function Links() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <Head>
          <title>Links</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Hello, welcome to my links" />
          <meta property="og:title" content="Links" />
          <meta
            property="og:description"
            content="Hello, welcome to my links"
          />
          <meta property="og:url" content="https://ashwinprasad.dev/links" />
          <meta property="og:type" content="website" />
        </Head>
        <Link href="mailto:mail@ashwinprasad.dev?subject=Message">EMAIL</Link>
        <Link href="https://github.com/APrasad021">GITHUB</Link>
        <Link href={"https://www.goodreads.com/aprasad021"}>GOODREADS</Link>
        <Link href="https://www.linkedin.com/in/aprasad021/">LINKEDIN</Link>
      </div>
    </motion.div>
  );
}
