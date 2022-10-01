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

type Props = {
  books: Book[];
  lastUpdated: string;
};

export default function Books(props: Props) {
  return (
    <div>
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

      <div className={styles.container}>
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
    },
  };
}

export async function getStaticPaths() {
  const paths = shelves.map((shelf: string) => ({
    params: { shelf: shelf },
  }));

  return { paths, fallback: false };
}
