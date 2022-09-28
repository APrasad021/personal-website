import Head from "next/head";
import client from "../../util/apollo-client";
import { GET_POST, GET_POSTS_SLUGS } from "../../util/queries";
import { PostData, PostsConnectionData, SlugParam } from "../../util/types";

import styles from "../../styles/blogpost.module.css";
import ReadingBar from "../../components/ReadingBar";

type Props = {
  post: PostData;
};

export default function PostPage(props: Props) {
  console.log("hi");
  const createdAt = new Date(props.post.createdAt).toDateString();
  const updatedAt = new Date(props.post.updatedAt).toDateString();
  const showLastUpdatedFooter = createdAt !== updatedAt;

  return (
    <div className={styles.container}>
      <Head>
        <title>{props.post.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Hello, welcome to my blog post" />
        <meta property="og:title" content={props.post.title} />
        <meta
          property="og:description"
          content="Hello, welcome to my blog post"
        />
        <meta
          property="og:url"
          content={`https://ashwinprasad.dev/blog/${props.post.title}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <ReadingBar />
      <h1 className={styles.title}>{props.post.title}</h1>
      <h3 className={styles.timestamp}>
        {new Date(props.post.createdAt).toDateString()}
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: props.post.content.html }}
        className={styles.content}
      />
      {showLastUpdatedFooter && (
        <p className={styles.lastupdated}>Last updated {updatedAt}</p>
      )}
    </div>
  );
}

export async function getStaticProps({ params }: SlugParam) {
  const { data } = await client.query({
    query: GET_POST,
    variables: { slug: params.slug },
  });
  return {
    props: {
      post: data.post,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data } = await client.query({
    query: GET_POSTS_SLUGS,
  });

  // Get the paths we want to pre-render based on posts
  const paths = data.postsConnection.edges.map((post: PostsConnectionData) => ({
    params: { slug: post.node.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
