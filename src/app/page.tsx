import type { Metadata } from "next";
import classes from "./page.module.scss";

export const metadata: Metadata = {
  title: "Chronicle",
  description: "A simple, focused place for your notes and thoughts.",
};

const Home = () => {
  return (
    <div className={classes.home}>
      <section className={classes.home__hero}>
        <div className={classes.home__heroContent}>
          <h1 className={classes.home__title}>Chronicle</h1>
          <p className={classes.home__subtitle}>
            A simple, focused place for your notes and thoughts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
