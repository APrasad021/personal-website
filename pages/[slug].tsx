import Head from "next/head";
import client from "../apollo-client";
import { GET_PAGES, GET_PAGE_QUERY } from "../queries";
import { PageData } from "../types";

import styles from "../styles/page.module.css";

type Props = {
    page: PageData,
};

type SlugParam = {
    params: {
        slug: string,
    }   
};

type PostData = {
    slug: string,
}

export default function Page(props: Props) {
    const hideLastUpdatedFooter = ["About"];
    const showLastUpdatedFooter = !hideLastUpdatedFooter.includes(props.page.title); 
    return (
        <div className={styles.container}>
            <Head>
                <title>{props.page.title}</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: props.page.content.html }} className={styles.content} />
            {showLastUpdatedFooter && <p className={styles.lastupdated}>Last updated {new Date(props.page.updatedAt).toDateString()}</p>}
        </div>
    )
    };

export async function getStaticProps({ params }: SlugParam) {
    const { data } = await client.query({
        query: GET_PAGE_QUERY,
        variables: { slug: params.slug },
    });

    return {
        props: {
        page: data.page,
        },
    };
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const { data } = await client.query({
        query: GET_PAGES,
    });
  
    // Get the paths we want to pre-render based on posts

    const paths = data.pages.map((post: PostData) => ({
      params: { slug: post.slug },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }