import styles from "../styles/links.module.css";

type Props = {
  tag: string;
  onClick: (tag: string) => void;
  selectedTags: string[];
};

function TagButton({ tag, onClick, selectedTags }: Props) {
  const isSelected = selectedTags.includes(tag);
  return (
    <div className={isSelected ? styles["tag-active"] : styles["tag-inactive"]}>
      <button onClick={() => onClick(tag)}>{tag}</button>
    </div>
  );
}

export default TagButton;
