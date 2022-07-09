import styles from "./Details.module.css";

// rsvp by August 5
// regsitry https://www.target.com/gift-registry/gift/amoscato

export const Details = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.date}>
        September 4, 2022
        <br />
        11am &ndash; 2pm
      </h1>
      <div className={styles.location}>
        <a href="http://cafenottepgh.com/" target="_blank" rel="noreferrer">
          Cafe Notte Restaurant
        </a>
        <br />
        8070 Ohio River Blvd
        <br />
        Pittsburgh, PA 15202
      </div>
    </div>
  );
};
