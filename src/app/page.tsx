import { LatestNewsCarousel } from "@/components/news/LatestNewsCarousel";
import type { Metadata } from "next";
import classes from "./page.module.scss";

export const metadata: Metadata = {
  title: "Chronicle",
  description: "News from the Guardian",
};

const Home = () => {
  return (
    <div className={classes.home}>
      <section className={classes.home__hero}>
        <div className={classes.home__heroContent}>
          <h1 className={classes.home__title}>Chronicle</h1>
          <p className={classes.home__subtitle}>
            News from the Guardian
          </p>
          <LatestNewsCarousel className={classes.home__carousel} />
        </div>
      </section>
    </div>
  );
};

export default Home;
