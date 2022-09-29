import client from "../util/apollo-client";
import { motion } from "framer-motion";
import { GET_POSTS } from "../util/queries";
import Link from "next/link";
import { PostsConnectionData, PostsConnections } from "../util/types";
import Head from "next/head";

import styles from "../styles/blog.module.css";

export default function Blog(props: PostsConnections) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <Head>
          <title>Blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Hello, welcome to my blog" />
          <meta property="og:title" content="Blog" />
          <meta property="og:description" content="Hello, welcome to my blog" />
          <meta property="og:url" content="https://ashwinprasad.dev/blog" />
          <meta property="og:type" content="website" />
        </Head>
        {props.posts.map((post: PostsConnectionData) => (
          <div className={styles.blogitem} key={post.node.slug}>
            <h3 className={styles.title}>
              <Link href={`/blog/${post.node.slug}`}>
                <a>{post.node.title}</a>
              </Link>
            </h3>
            <p className={styles.timestamp}>
              {new Date(post.node.createdAt).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: data.postsConnection.edges,
    },
  };
}
