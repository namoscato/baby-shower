import { Details } from "components/Details";
import { Rsvp } from "components/Rsvp";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import fallFamily from "../public/fall-family.png";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tesin&rsquo;s Baby Shower</title>
        <meta
          name="description"
          content="You are invited to a baby shower honoring Tesin Amoscato on September 4, 2022 in Pittsburgh, Pennsylvania."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image
          src={fallFamily}
          alt="Amoscato fall family drawing"
          priority
          width="600"
          height="525"
        />
        <h2 className={styles.subtitle}>falling in love with</h2>
        <h1 className={styles.title}>Baby Amoscato</h1>
      </header>

      <main className={styles.main}>
        <Details />
        <Rsvp />
      </main>
    </div>
  );
};

export default Home;
