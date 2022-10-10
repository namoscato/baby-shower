import Image from "next/image";
import { ReactNode } from "react";
import fallFamily from "../../public/images/fall-family.png";
import styles from "./Header.module.css";

interface Props {
  children: ReactNode;
}

export const Header = ({ children }: Props) => {
  return (
    <header className={styles.root}>
      <Image
        src={fallFamily}
        alt="Amoscato fall family drawing"
        priority
        width="600"
        height="470"
      />
      <div className={styles.title}>{children}</div>
    </header>
  );
};
