import { WishResponse } from "lib/wishes/types";
import { shuffle } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { CardNavigation } from "./CardNavigation";
import { DesktopPagination } from "./DesktopPagination";
import { MobilePagination } from "./MobilePagination";
import styles from "./Wishes.module.css";

interface Props {
  wishes: WishResponse[];
}

export const Wishes = (props: Props) => {
  const [wishes, setWishes] = useState<WishResponse[]>([]);
  useEffect(() => {
    setWishes(shuffle(props.wishes));
  }, [props.wishes]);

  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    const index = wishes.findIndex(
      (wish) => hashFromWish(wish) === window.location.hash
    );

    setActiveIndex(-1 === index ? 0 : index);
  }, [wishes]);

  const activeWish = wishes[activeIndex] as WishResponse | undefined;
  useEffect(() => {
    if (activeWish) {
      history.replaceState(null, "", hashFromWish(activeWish));
    }
  }, [activeWish]);

  const next = useCallback(() => {
    setActiveIndex((prevValue) => {
      if (wishes.length - 1 === prevValue) {
        return 0;
      }

      return prevValue + 1;
    });
  }, [wishes.length]);

  const previous = useCallback(() => {
    setActiveIndex((prevValue) => {
      if (0 === prevValue) {
        return wishes.length - 1;
      }

      return prevValue - 1;
    });
  }, [wishes.length]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.card}>
          <ul className={styles.list}>
            {activeWish?.wishes.map(({ prompt, response }) => (
              <li key={prompt}>
                <div className={styles.prompt}>{prompt}…</div>
                <div className={styles.answer}>{response}</div>
              </li>
            ))}
          </ul>
        </div>
        <CardNavigation onPrevious={previous} onNext={next} />
      </div>
      <DesktopPagination
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        totalCount={wishes.length}
      />
      <MobilePagination onPrevious={previous} onNext={next} />
    </>
  );
};

function hashFromWish({ id }: WishResponse): string {
  return `#${id}`;
}
