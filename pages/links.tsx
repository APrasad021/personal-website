import client from "../util/apollo-client";
import { GET_PAGE_QUERY } from "../util/queries";
import Link from "next/link";
import Head from "next/head";
import notion, { getLinksFilter } from "../util/notion";

import styles from "../styles/links.module.css";
import { useEffect, useState } from "react";

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Links({ tags, initialLinks }: Props) {
  console.log(initialLinks);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<Link[]>(initialLinks || []);

  useEffect(() => {
    const fetchFilteredLinks = async () => {
      if (selectedTags.length === 0) {
        setLinkData(initialLinks);
        return;
      } else {
        fetch("api/links", {
          method: "POST",
          body: JSON.stringify({ tags: selectedTags }),
        })
          .then((res) => res.json())
          .then((data) => {
            setLinkData(data);
          });
      }
    };

    fetchFilteredLinks();
  }, [initialLinks, selectedTags]);

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
      <div>
        {tags.map((tag) => (
          <button
            onClick={() => setSelectedTags([...selectedTags, tag.name])}
            key={tag.id}
          >
            {tag.name.toUpperCase()}
          </button>
        ))}
      </div>
      <div>
        {linkData.map((link) => (
          <Link href={link.properties.URL.url} key={link.id}>
            <a>{link.properties.Name.title[0].plain_text}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const databaseData = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const tags = databaseData.properties.Tags.multi_select.options.map((tag) => ({
    name: tag.name,
    id: tag.id,
  }));

  const linkData = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: getLinksFilter(),
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  return {
    props: {
      tags,
      initialLinks: linkData.results,
    },
  };
}
