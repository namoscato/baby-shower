import styles from "./Details.module.css";

export const Details = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.date}>
        September 4, 2022
        <br />
        11am &ndash; 2pm
      </h1>
      <div className={styles.location}>
        <a
          href="http://cafenottepgh.com/"
          target="_blank"
          rel="noreferrer"
          title="View Restaurant Website"
        >
          Cafe Notte Restaurant
        </a>
        <br />
        <a
          href="https://goo.gl/maps/yER1Lijp1h8Jggzy8"
          target="_blank"
          rel="noreferrer"
          title="View in Google Maps"
        >
          8070 Ohio River Blvd
          <br />
          Pittsburgh, PA 15202
        </a>
      </div>
    </div>
  );
};
