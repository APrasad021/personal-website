import { Book } from "../util/types";
import styles from "../styles/bookshelf.module.css";
import { CSSProperties, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getStars } from "../util/bookshelves";
import { isMobile } from "react-device-detect";

type Props = {
  book: Book;
};

function Book({ book }: Props) {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const valueIsDefined = (value: any, notDefinedValue: any) => {
    return value !== notDefinedValue;
  };

  const trimmedTitle = book.title
    .split(":")[0]
    .split("(")[0]
    .split("[")[0]
    .trim()
    .replace(/[^\x00-\x7F]/g, "");

  const getShadow = () => {
    return isHover
      ? "0 8px 12px rgba(132, 115, 177, 1)"
      : "0 1px 3px rgba(0,0,0,0.12)";
  };

  const hoverShadow: CSSProperties = {
    boxShadow: getShadow(),
    cursor: isHover ? "pointer" : "default",
  };

  const onCardClick = () => {
    router.push(book.book_url);
  };

  return (
    <div
      className={styles.card}
      style={hoverShadow}
      onMouseOver={!isMobile ? () => setIsHover(true) : undefined}
      onMouseEnter={!isMobile ? () => setIsHover(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHover(false) : undefined}
      onClick={onCardClick}
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
          {book.avg_rating} (
          {book.num_ratings.replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
        </div>
        {valueIsDefined(book.rating, "None") && (
          <div className={styles.myrating}>
            {getStars(book.rating, !isMobile ? isHover : false)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
