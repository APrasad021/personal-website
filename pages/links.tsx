import client from "../apollo-client";
import { GET_PAGE_QUERY } from "../queries";
import Link from 'next/link';
import Head from "next/head";

import styles from "../styles/links.module.css";

export default function Links() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Links</title>
            </Head>
            <Link href="mailto:mail@ashwinprasad.dev?subject=Message">EMAIL</Link>
            <Link href="https://github.com/APrasad021">GITHUB</Link>
            <Link href={"https://www.goodreads.com/aprasad021"}>GOODREADS</Link>
            <Link href="https://www.linkedin.com/in/aprasad021/">LINKEDIN</Link>
        </div>
    )
    };
