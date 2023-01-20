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

import { getStars, shelves } from "../../util/bookshelves";
import Link from "next/link";
import BookCard from "../../components/Book";

import styles from "../../styles/bookshelf.module.css";
import Head from "next/head";
import moment from "moment";

type Props = {
  books: Book[];
  lastUpdated: string;
  shelf: string;
};

export default function Books(props: Props) {
  const isReadShelf = props.shelf === "read";
  const getHeadingSection = () => {
    let lexicon =
      "The community rating and # of community ratings are shown in the bottom of each card, respectively.";
    if (isReadShelf) {
      const lexiconHeader =
        lexicon +
        ` My personal rating (out of 5 stars) is shown in the bottom right of most of the books that I've read. How I rate books:`;
      const lexiconFooter =
        "Anything 3 stars and above is a book that I recommend giving a read.";
      const starMeanings = [
        "a tough read",
        "an okay read",
        "a good read",
        "a great read",
        "a must read",
      ];
      return (
        <div>
          <p>{lexiconHeader}</p>
          <div className={styles.starsmeaning}>
            {starMeanings.map((meaning, index) => {
              return (
                <div className={styles.meaningitem} key={index}>
                  <div>{getStars(index + 1, false, 12)}</div>
                  <p>{meaning}</p>
                </div>
              );
            })}
          </div>
          <p>{lexiconFooter}</p>
        </div>
      );
    }
    return lexicon;
  };

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
      <div className={isReadShelf ? styles.readheading : styles.lexicon}>
        {getHeadingSection()}
      </div>
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
      // only return the data that we need for books
      // which is defined by the Book type
      books: bookData.map((book) => {
        return {
          id: book.id,
          book_url: book.book_url,
          avg_rating: book.avg_rating,
          num_ratings: book.num_ratings,
          num_pages: book.num_pages,
          rating: book.rating,
          review: book.review,
          title: book.title,
          author: book.author,
          author_url: book.author_url,
          date_read: book.date_read,
          shelf: book.shelf,
          cover_image_url: book.cover_image_url,
        };
      }),
      lastUpdated: moment(
        new Date(lastUpdatedData[0].last_updated.seconds * 1000)
      ).fromNow(),
      shelf: params.shelf,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = shelves.map((shelf: string) => ({
    params: { shelf: shelf },
  }));

  return { paths, fallback: false };
}
