import { Book } from "../util/types";
import styles from "../styles/bookshelf.module.css";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import Image from "next/image";

type Props = {
  book: Book;
};

function Book({ book }: Props) {
  const [isHover, setIsHover] = useState(false);
  const valueIsDefined = (value: any, notDefinedValue: any) => {
    return value !== notDefinedValue;
  };

  const trimmedTitle = book.title.split(":")[0];

  const getFilter = () => {
    if (book.rating === 0) {
      let shadowColor = "gray";
      if (book.shelf === "currently-reading") shadowColor = "blue";
      if (book.shelf === "to-read") shadowColor = "green";
      return isHover ? `drop-shadow(0 0 .3rem ${shadowColor})` : "none";
    }
    return isHover
      ? `drop-shadow(0 0 ${
          0.05 * book.rating + (book.rating > 3 ? book.rating * 0.1 : 0)
        }rem teal)`
      : "none";
  };

  const hoverShadow: CSSProperties = {
    filter: getFilter(),
    cursor: isHover ? "pointer" : "default",
  };

  const getStars = () => {
    const stars = [];
    for (let i = 0; i < book.rating; i++) {
      stars.push(
        <Image
          src={isHover ? "/star_filled.svg" : "/star_outline.svg"}
          width={15}
          height={15}
          key={i}
          alt="Hand drawn Star"
          style={
            isHover
              ? {
                  filter:
                    "invert(33%) sepia(35%) saturate(3204%) hue-rotate(153deg) brightness(91%) contrast(100%)",
                }
              : {}
          }
        />
      );
    }
    return stars;
  };

  return (
    <div
      className={styles.card}
      style={hoverShadow}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={book.book_url} target="_blank">
        <a
          style={{
            all: "unset",
            width: "100%",
            height: "100%",
            position: "relative",
            display: "inline-block",
          }}
        >
          <div className={styles.cardheading}>
            <h4 className={styles.booktitle}>{trimmedTitle}</h4>
            <p>{book.author}</p>
          </div>
          {book.shelf === "read" && (
            <div className={styles.cardbody}>
              {valueIsDefined(book.date_read, "not set") && (
                <p>Completed on {book.date_read}</p>
              )}
            </div>
          )}
          {valueIsDefined(book.rating, "None") && (
            <div className={styles.ratingcontainer}>
              <div className={styles.rating}>{getStars()}</div>
            </div>
          )}
        </a>
      </Link>
    </div>
  );
}

export default Book;
