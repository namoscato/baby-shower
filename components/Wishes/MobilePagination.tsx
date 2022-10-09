import cn from "classnames";
import styles from "./MobilePagination.module.css";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
}

export const MobilePagination = ({ onPrevious, onNext }: Props) => {
  return (
    <div className={styles.root}>
      <button
        className={cn(styles.button, styles.buttonPrevious)}
        title="View Previous"
        onClick={onPrevious}
      >
        ‹ Previous
      </button>
      <button
        className={cn(styles.button, styles.buttonNext)}
        title="View Next"
        onClick={onNext}
      >
        Next ›
      </button>
    </div>
  );
};
