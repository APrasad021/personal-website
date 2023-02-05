import Head from "next/head";
import notion, { getLinksFilter } from "../util/notion";

import styles from "../styles/links.module.css";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { LineWave } from "react-loader-spinner";
import TagButton from "../components/TagButton";
import LinkItem from "../components/LinkItem";
import { Link as LinkType } from "../util/types";

type Props = {
  tags: string[];
  initialLinks: LinkType[];
  initialCursor: string;
};

export default function Links({ tags, initialLinks, initialCursor }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<LinkType[]>(initialLinks || []);
  const [cursor, setCursor] = useState<string | undefined>(
    undefined || initialCursor
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [tagsChanged, setTagsChanged] = useState<boolean>(false);
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
          body: JSON.stringify({ tags: selectedTags, cursor: cursor }),
        })
          .then((res) => res.json())
          .then((data) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsChanged, waypointEntered, selectedTags]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagsChanged(true);
  };

  const handleWaypointEnter = () => {
    if (cursor) setWaypointEntered(true);
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
        <div className={styles["lexicon"]}>
          <p>My online bookmarks</p>
        </div>
        <div className={styles["tags-container"]}>
          {tags.map((tag) => (
            <TagButton
              tag={tag}
              onClick={handleTagClick}
              key={tag}
              selectedTags={selectedTags}
            />
          ))}
        </div>
        <div className={styles["links-container"]}>
          {linkData.map((link) => (
            <LinkItem
              link={link}
              key={link.id}
              onTagClick={handleTagClick}
              selectedTags={selectedTags}
            />
          ))}
        </div>
        {cursor && (
          <Waypoint onEnter={() => handleWaypointEnter()}>
            <LineWave
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="line-wave"
              visible={waypointEntered && loading}
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-20px",
              }}
              firstLineColor="#a769a7"
              middleLineColor="#2b6cc2"
              lastLineColor="#a769a7"
            />
          </Waypoint>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const databaseData = await notion.databases.retrieve({
    // @ts-ignore
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // @ts-ignore
  const tags = databaseData.properties.Tags.multi_select.options.map(
    (tag: any) => tag.name
  );

  const linkData = await notion.databases.query({
    // @ts-ignore
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
      tags: tags.sort(),
      initialLinks: linkData.results,
      initialCursor: linkData.next_cursor,
    },
    revalidate: 60,
  };
}
