import { collection, getDocs, where, query } from "firebase/firestore/lite";
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
      <h1>Books</h1>
      <Link href="/books/currently-reading">Currently Reading</Link>
      <Link href="/books/read">Read</Link>
      <Link href="/books/to-read">Reading List</Link>
      <div className={styles.container}>
        {props.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <p>{props.lastUpdated}</p>
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

  const lastUpdatedData = lastUpdatedSnapshot.docs.map((doc) => doc.data());
  const bookData = booksSnapshot.docs.map((doc) => doc.data());

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
