import type { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
