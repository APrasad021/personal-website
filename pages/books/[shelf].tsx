import {
  collection,
  getDocs,
  where,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore/lite";
import db from "../../util/firebase";
import { ShelfParam, Book } from "../../util/types";

import { shelves } from "../../util/bookshelves";
import Link from "next/link";
import BookCard from "../../components/Book";

import styles from "../../styles/bookshelf.module.css";
import Head from "next/head";

type Props = {
  books: Book[];
  lastUpdated: string;
  shelf: string;
};

export default function Books(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Books</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Hello, welcome to my blog post" />
        <meta property="og:title" content="Books" />
        <meta
          property="og:description"
          content="Hello, welcome to my bookshelves"
        />
        <meta
          property="og:url"
          content={`https://ashwinprasad.dev/book/${props.shelf}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <p>
        The books are scraped from{" "}
        <a href="https://www.goodreads.com/user/show/139988530-ashwin-prasad">
          my Goodreads profile
        </a>
        . The community rating and # of community ratings are shown in the
        bottom left of each card, respectively. My personal rating (out of 5) is
        shown in the bottom right of most of the books that I&apos;ve read.
      </p>
      <div className={styles.bookselflinks}>
        <Link href="/books/currently-reading">
          <a>Currently Reading</a>
        </Link>
        <Link href="/books/read">
          <a>Read</a>
        </Link>
        <Link href="/books/to-read">
          <a>Reading List</a>
        </Link>
      </div>

      <div className={styles.bookcontainer}>
        {props.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <p className={styles.timestamp}>Last updated: {props.lastUpdated}</p>
    </div>
  );
}

export async function getStaticProps({ params }: ShelfParam) {
  const booksCol = query(
    collection(db, "books"),
    where("shelf", "==", params.shelf)
  );
  const lastUpdatedCol = query(
    collection(db, "books"),
    where("last_updated", "!=", null)
  );

  const booksSnapshot = await getDocs(booksCol);
  const lastUpdatedSnapshot = await getDocs(lastUpdatedCol);

  const lastUpdatedData = lastUpdatedSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => doc.data()
  );
  const bookData = booksSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => doc.data()
  );

  return {
    props: {
      books: bookData,
      lastUpdated: lastUpdatedData[0].last_updated.toDate().toDateString(),
      shelf: params.shelf,
    },
  };
}

export async function getStaticPaths() {
  const paths = shelves.map((shelf: string) => ({
    params: { shelf: shelf },
  }));

  return { paths, fallback: false };
}
