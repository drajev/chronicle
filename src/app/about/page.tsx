import { Link } from "@/components/ui";
import { ROUTES } from "@/lib/constants/navigation";
import type { Metadata } from "next";
import classes from "./page.module.scss";

export const metadata: Metadata = {
  title: "About | Chronicle",
  description:
    "Chronicle is a news reader that brings you the latest stories from The Guardian. Browse by topic, search by date, and stay informed.",
};

export default function AboutPage() {
  return (
    <article className={classes.about}>
      <header className={classes.about__header}>
        <h1 className={classes.about__title}>About Chronicle</h1>
        <p className={classes.about__lead}>A focused news experience powered by The Guardian.</p>
      </header>

      <div className={classes.about__content}>
        <section className={classes.about__section}>
          <h2 className={classes.about__sectionTitle}>What it is</h2>
          <p className={classes.about__body}>
            Chronicle is a portfolio project that aggregates and displays articles from The Guardian
            Content API. You can browse latest headlines by topic (Business, Sport, Technology, and
            more), search by date range, and explore featured and trending stories—all in a clean,
            accessible interface.
          </p>
        </section>

        <section className={classes.about__section}>
          <h2 className={classes.about__sectionTitle}>Features</h2>
          <ul className={classes.about__list}>
            <li>Topic filters: Business, Sport, Economics, Technology, Science, Culture, World</li>
            <li>Date range search with optional keyword</li>
            <li>Featured carousel and virtual-scrolled headlines on the home page</li>
            <li>Lazy-loaded articles as you scroll</li>
            <li>Dark and light theme support</li>
          </ul>
        </section>

        <section className={classes.about__section}>
          <h2 className={classes.about__sectionTitle}>Source</h2>
          <p className={classes.about__body}>
            All articles and content are provided by{" "}
            <Link href="https://www.theguardian.com" external className={classes.about__link}>
              The Guardian
            </Link>{" "}
            via their open Content API. Chronicle is an independent project and is not affiliated
            with or endorsed by The Guardian.
          </p>
        </section>

        <p className={classes.about__cta}>
          <Link href={ROUTES.news} variant="primary" className={classes.about__ctaLink}>
            Browse News
          </Link>
        </p>
      </div>
    </article>
  );
}
