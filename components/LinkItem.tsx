import Link from "next/link";
import styles from "../styles/links.module.css";
import TagButton from "./TagButton";
import { Link as LinkType } from "../util/types";

type Props = {
  link: LinkType;
  onTagClick: (tag: string) => void;
  selectedTags: string[];
};

function LinkItem({ link, onTagClick, selectedTags }: Props) {
  return (
    <div className={styles["link-item"]}>
      <div className={styles["link-item-title"]}>
        <Link href={link.properties.URL.url} key={link.id}>
          <a>{link.properties.Name.title[0].plain_text}</a>
        </Link>
      </div>
      <div className={styles["link-item-tags"]}>
        {link.properties.Tags.multi_select.map((tag: any) => (
          <TagButton
            tag={tag.name}
            key={tag.id}
            onClick={() => onTagClick(tag.name)}
            selectedTags={selectedTags}
          />
        ))}
      </div>
    </div>
  );
}

export default LinkItem;
