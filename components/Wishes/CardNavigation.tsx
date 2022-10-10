import cn from "classnames";
import { useEffect } from "react";
import styles from "./CardNavigation.module.css";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
}

export const CardNavigation = ({ onPrevious, onNext }: Props) => {
  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if ("ArrowLeft" === key) {
        onPrevious();
      } else if ("ArrowRight" === key) {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onNext, onPrevious]);

  return (
    <div className={styles.root}>
      <button
        className={cn(styles.button, styles.buttonPrevious)}
        title="View Previous"
        onClick={onPrevious}
      >
        ‹
      </button>
      <button
        className={cn(styles.button, styles.buttonNext)}
        title="View Next"
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
};
