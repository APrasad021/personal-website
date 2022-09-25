import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function NavBar() {
  return (
    <div className={styles.navbarcontainer}>
      <div className={styles.homelink}>
        <Link href="/">
          <a>Ashwin Prasad</a>
        </Link>
      </div>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/education">
        <a>Education</a>
      </Link>
      <Link href="/links">
        <a>Links</a>
      </Link>
      <Link href="/people">
        <a>People</a>
      </Link>
      <Link href="/space">
        <a>Space</a>
      </Link>
    </div>
  );
}

export default function NavBarWrapper({ children }: Props) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
