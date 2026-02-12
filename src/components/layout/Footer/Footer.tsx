import { NAV_FOOTER_LINKS, ROUTES } from "@/lib/constants";
import Link from "next/link";
import { HiOutlineBookOpen } from "react-icons/hi2";
import classes from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.top}>
          <Link href={ROUTES.home} className={classes.brand}>
            <HiOutlineBookOpen className={classes.brandIcon} aria-hidden />
            <span>Chronicle</span>
          </Link>
          <nav className={classes.nav} aria-label="Footer">
            <ul className={classes.list}>
              {NAV_FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={classes.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={classes.bottom}>
          <p className={classes.copyright}>© {currentYear} Chronicle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
