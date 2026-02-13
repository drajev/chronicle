import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./MainLayout.module.scss";

const MAIN_CONTENT_ID = "main-content";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={classes.root}>
      <Link href={`#${MAIN_CONTENT_ID}`} className={classes.skipLink}>
        Skip to main content
      </Link>
      <Header />
      <main id={MAIN_CONTENT_ID} className={classes.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
