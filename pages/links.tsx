import client from "../util/apollo-client";
import { GET_PAGE_QUERY } from "../util/queries";
import Link from "next/link";
import Head from "next/head";
import notion from "../util/notion";

import styles from "../styles/links.module.css";

type Link = {
  id: string;
  title: string;
  url: string;
  tags: string[];
};

type Props = {
  tags: string[];
  links: Link[];
};

export default function Links({ tags, databaseData }) {
  console.log(tags, databaseData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Links</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Hello, welcome to my links" />
        <meta property="og:title" content="Links" />
        <meta property="og:description" content="Hello, welcome to my links" />
        <meta property="og:url" content="https://ashwinprasad.dev/links" />
        <meta property="og:type" content="website" />
      </Head>
      <Link href="mailto:mail@ashwinprasad.dev?subject=Message">EMAIL</Link>
      <Link href="https://github.com/APrasad021">GITHUB</Link>
      <Link href={"https://www.goodreads.com/aprasad021"}>GOODREADS</Link>
      <Link href="https://www.linkedin.com/in/aprasad021/">LINKEDIN</Link>
    </div>
  );
}

export async function getStaticProps() {
  const databaseData = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  const tags = databaseData.properties.Tags.multi_select.options.map(
    (tag) => tag.name
  );
  console.log(tags);
  const response = await notion.search({
    query: "Links",
    filter: {
      value: "database",
      property: "object",
    },
  });

  return {
    props: {
      tags,
      databaseData,
    },
  };
}
