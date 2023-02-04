import client from "../util/apollo-client";
import { GET_PAGE_QUERY } from "../util/queries";
import Link from "next/link";
import Head from "next/head";
import notion, { getLinksFilter } from "../util/notion";

import styles from "../styles/links.module.css";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

type Link = {
  id: string;
  title: string;
  url: string;
  tags: string[];
};

type Props = {
  tags: string[];
  initialLinks: Link[];
  initialCursor: string;
};

export default function Links({ tags, initialLinks, initialCursor }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<Link[]>(initialLinks || []);
  const [cursor, setCursor] = useState<string>(initialCursor || undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagsChanged, setTagsChanged] = useState<string[]>(false);
  const [waypointEntered, setWaypointEntered] = useState<boolean>(false);

  useEffect(() => {
    const fetchFilteredLinks = async () => {
      if (selectedTags.length === 0 && !waypointEntered) {
        setLinkData(initialLinks);
        setCursor(initialCursor);
        return;
      } else {
        fetch("api/links", {
          method: "POST",
          body: JSON.stringify({ tags: selectedTags }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (tagsChanged) {
              setLinkData(data.results);
              setCursor(data.next_cursor);
            } else {
              setLinkData([...linkData, ...data.results]);
              setCursor(data.next_cursor);
              setWaypointEntered(false);
            }
          });
      }
    };
    setLoading(true);
    fetchFilteredLinks();
    setLoading(false);
  }, [
    initialCursor,
    initialLinks,
    linkData,
    selectedTags,
    tagsChanged,
    waypointEntered,
  ]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag.name]);
    }
    setTagsChanged(true);
  };

  const handleWaypointEnter = () => {
    setWaypointEntered(true);
  };

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
          <button onClick={() => handleTagClick(tag)} key={tag.id}>
            {tag.name}
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
      {cursor && (
        <div>
          <Waypoint onEnter={() => handleWaypointEnter()}>
            <div>{loading && <p>Loading...</p>}</div>
          </Waypoint>
        </div>
      )}
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
      initialCursor: linkData.next_cursor,
    },
  };
}
