import { Book } from "../util/types";

import styles from "../styles/bookshelf.module.css";

type Props = {
  book: Book;
};

function Book({ book }: Props) {
  const valueIsDefined = (value: any, notDefinedValue: any) => {
    return value !== notDefinedValue;
  };

  const trimmedTitle = book.title.split(":")[0];

  return (
    <div className={styles.card}>
      <div className={styles.cardheading}>
        <h4 className={styles.booktitle}>{trimmedTitle}</h4>
        <p>{book.author}</p>
      </div>
      <div className={styles.cardbody}>
        {valueIsDefined(book.date_read, "not set") && (
          <p>Completed on {book.date_read}</p>
        )}
        {valueIsDefined(book.rating, 0) && <p>{book.rating}</p>}
      </div>
      {/* {valueIsDefined(book.review, "None") && <p>{book.review}</p>} */}
    </div>
  );
}

export default Book;
