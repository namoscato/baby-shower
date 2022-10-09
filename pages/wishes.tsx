import { Header } from "components/Layout/Header";
import { Wishes } from "components/Wishes";
import { fetchWishes } from "lib/wishes";
import { WishResponse } from "lib/wishes/types";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import babyAmoscatoWishesTitle from "../public/images/baby-amoscato-wishes-title.png";
import styles from "./Wishes.module.css";

interface Props {
  wishes: WishResponse[];
}

export default function WishesPage({ wishes }: Props) {
  return (
    <>
      <Head>
        <title>Wishes for Baby Amoscato</title>
        <meta
          name="description"
          content="We asked friends and family to give wishes for Baby Amoscato."
        />
      </Head>
      <Header>
        <Image
          src={babyAmoscatoWishesTitle}
          alt="wishes for Baby Amoscato"
          priority
          width="533"
          height="137"
        />
      </Header>
      <main className={styles.main}>
        <Wishes wishes={wishes} />
      </main>
      <footer className={styles.footer}>
        <Link href="/">
          <a>&larr; Return Home</a>
        </Link>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const wishes = await fetchWishes(
    String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
    String(process.env.GOOGLE_SHEETS_WISHES_SHEET_ID)
  );

  return {
    props: { wishes },
  };
};
