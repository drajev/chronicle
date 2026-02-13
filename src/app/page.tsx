import { HeadlinesList, LatestNewsCarousel } from "@/components/news";
import { Button, Link } from "@/components/ui";
import { ROUTES } from "@/lib/constants/navigation";
import type { Metadata } from "next";
import classes from "./page.module.scss";

export const metadata: Metadata = {
  title: "Chronicle",
  description:
    "Curated news from The Guardian. Browse by topic, search by date, and stay informed with a clean, focused reader.",
};

const Home = () => {
  return (
    <div className={classes.home}>
      <section className={classes.home__hero}>
        <div className={classes.home__heroContent}>
          <header className={classes.home__heroHeader}>
            <h1 className={classes.home__title}>Chronicle</h1>
            <p className={classes.home__tagline}>
              Curated news from The Guardian
            </p>
            <p className={classes.home__subtitle}>
              Browse featured stories and headlines, or search by topic and date. Clean, fast, and easy to use.
            </p>
            <div className={classes.home__cta}>
              <Link href={ROUTES.news}>
                <Button variant="primary" size="md">
                  Browse News
                </Button>
              </Link>
            </div>
          </header>
          <LatestNewsCarousel className={classes.home__carousel} />
          <HeadlinesList className={classes.home__headlines} />
        </div>
      </section>
    </div>
  );
};

export default Home;
