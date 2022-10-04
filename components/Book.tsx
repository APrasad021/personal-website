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

  const getShadow = () => {
    return isHover ? "0 8px 12px teal" : "0 1px 3px rgba(0,0,0,0.12)";
  };

  const hoverShadow: CSSProperties = {
    boxShadow: getShadow(),
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
      onMouseOver={() => setIsHover(true)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={book.book_url} target="_blank">
        <a
          style={{
            all: "unset",
            width: "100%",
            height: "100%",
          }}
        >
          <div className={styles.bodycontainer}>
            <div className={styles.imagecontainer}>
              <Image
                src={book.cover_image_url}
                width={49}
                height={75}
                alt="Book Cover"
              />
            </div>
            <div>
              <div className={styles.cardheading}>
                <h4 className={styles.booktitle}>{trimmedTitle}</h4>
                <p className={styles.author}>{book.author}</p>
              </div>
              {book.shelf === "read" && (
                <div className={styles.cardbody}>
                  {valueIsDefined(book.date_read, "not set") && (
                    <p>Completed on {book.date_read}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.ratingcontainer}>
            <div className={styles.communityrating}>
              {book.avg_rating} ({book.num_ratings})
            </div>
            {valueIsDefined(book.rating, "None") && (
              <div className={styles.myrating}>{getStars()}</div>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Book;
