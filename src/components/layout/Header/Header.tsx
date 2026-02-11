"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineSun, HiOutlineMoon, HiOutlineBookOpen } from "react-icons/hi2";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui";
import classes from "./Header.module.scss";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/styleguide", label: "Styleguide" },
  ];

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.left}>
          <Link href="/" className={classes.logo}>
            <HiOutlineBookOpen className={classes.logoIcon} aria-hidden />
          </Link>
        </div>

        <nav
          className={cn(classes.nav, isMobileMenuOpen && classes.navOpen)}
        >
          {navLinks.map((link) => (
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
