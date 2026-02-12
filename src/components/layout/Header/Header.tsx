"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineSun, HiOutlineMoon, HiOutlineBookOpen } from "react-icons/hi2";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui";
import { NAV_HEADER_LINKS, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import classes from "./Header.module.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.left}>
          <Link href={ROUTES.home} className={classes.logo}>
            <HiOutlineBookOpen className={classes.logoIcon} aria-hidden />
          </Link>
        </div>

        <nav
          className={cn(classes.nav, isMobileMenuOpen && classes.navOpen)}
          aria-label="Main"
        >
          {NAV_HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classes.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={classes.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            icon={theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          />
          <button
            type="button"
            className={classes.menuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <HiOutlineXMark className={classes.menuIcon} aria-hidden />
            ) : (
              <HiOutlineBars3 className={classes.menuIcon} aria-hidden />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
