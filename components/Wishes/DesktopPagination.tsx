import cn from "classnames";
import styles from "./DesktopPagination.module.css";

interface Props {
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  totalCount: number;
}

export const DesktopPagination = ({
  activeIndex,
  totalCount,
  setActiveIndex,
}: Props) => {
  const indexes = Array.from(Array(totalCount).keys());

  return (
    <ol className={styles.root}>
      {indexes.map((index) => (
        <li key={index}>
          <button
            className={cn(styles.button, {
              [styles.buttonActive]: index === activeIndex,
            })}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        </li>
      ))}
    </ol>
  );
};
