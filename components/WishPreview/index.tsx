import { WishResponse } from "lib/wishes/types";
import { random } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./WishPreview.module.css";

interface Props {
  wishes: WishResponse[];
}

export const WishPreview = ({ wishes }: Props) => {
  const [wishResponse, setWishResponse] = useState<WishResponse>();
  const wish = wishResponse?.wishes[0];

  useEffect(() => {
    setWishResponse(wishes[random(0, wishes.length - 1)]);
  }, [wishes]);

  return wishResponse && wish ? (
    <Link href={`/wishes#${wishResponse.id}`}>
      <a className={styles.root}>
        &ldquo;{wish.prompt} {wish.response}&rdquo;{" "}
        <sub>—&nbsp;from&nbsp;Wishes&nbsp;for&nbsp;Baby&nbsp;Amoscato</sub>
      </a>
    </Link>
  ) : (
    <div className={styles.root}>
      &nbsp;<sub>&nbsp;</sub>
    </div>
  );
};
