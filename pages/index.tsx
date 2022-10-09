import { Details } from "components/Details";
import { Header } from "components/Layout/Header";
import { Rsvp } from "components/Rsvp";
import Head from "next/head";
import Image from "next/image";
import babyAmoscatoTitle from "../public/images/baby-amoscato-title.png";
import viewBabyRegistry from "../public/images/view-baby-registry.png";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Tesin&rsquo;s Baby Shower</title>
        <meta
          name="description"
          content="You are invited to Tesin's baby shower on September 4, 2022 in Pittsburgh, Pennsylvania."
        />
      </Head>
      <Header>
        <Image
          src={babyAmoscatoTitle}
          alt="falling into love with Baby Amoscato"
          priority
          width="533"
          height="137"
        />
      </Header>
      <main className={styles.main}>
        <Details />
        <Rsvp />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.target.com/gift-registry/gift/amoscato"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={viewBabyRegistry}
            alt="View Baby Registry"
            priority
            width="333"
            height="96"
          />
        </a>
      </footer>
    </>
  );
}
