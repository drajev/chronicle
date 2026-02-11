"use client";

import { useState } from "react";
import {
  HiOutlineBookOpen,
  HiOutlinePencilSquare,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineBars3,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineCog6Tooth,
  HiOutlineHeart,
  HiOutlineHome,
} from "react-icons/hi2";
import { Button, Card, Input, Link, Spinner } from "@/components/ui";
import classes from "./page.module.scss";

const Styleguide = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>
          <HiOutlineBookOpen className={classes.titleIcon} aria-hidden />
          Chronicle Styleguide
        </h1>
        <p className={classes.subtitle}>
          Explore components and patterns. Use the theme toggle in the header to
          switch light/dark.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Theme palette</h2>
        <p className={classes.sectionDesc}>
          Four base colors per theme. All semantic colors (text, surfaces,
          borders, accent) derive from these. Gradients and shadows use the same
          palette.
        </p>
        <div className={classes.paletteRow}>
          <div className={classes.paletteSwatch} data-swatch="bg">
            <span className={classes.paletteLabel}>Background</span>
          </div>
          <div className={classes.paletteSwatch} data-swatch="surface">
            <span className={classes.paletteLabel}>Surface</span>
          </div>
          <div className={classes.paletteSwatch} data-swatch="muted">
            <span className={classes.paletteLabel}>Muted</span>
          </div>
          <div className={classes.paletteSwatch} data-swatch="accent">
            <span className={classes.paletteLabel}>Accent</span>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Gradients</h3>
          <div className={classes.gradientPreview} data-gradient="subtle" />
          <span className={classes.gradientLabel}>--gradient-subtle</span>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Buttons</h2>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Variants</h3>
          <div className={classes.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Sizes</h3>
          <div className={classes.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>With icon</h3>
          <div className={classes.row}>
            <Button icon={<HiOutlineArrowRight />} iconPosition="right">
              Next
            </Button>
            <Button
              variant="secondary"
              icon={<HiOutlinePencilSquare />}
              iconPosition="left"
            >
              Edit
            </Button>
            <Button variant="ghost" icon={<HiOutlineCheck />} iconPosition="left">
              Confirm
            </Button>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>States</h3>
          <div className={classes.row}>
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
            <Button href="/">As link</Button>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Spinner</h2>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Sizes</h3>
          <div className={classes.row}>
            <Spinner size="sm" aria-label="Loading small" />
            <Spinner size="md" aria-label="Loading medium" />
            <Spinner size="lg" aria-label="Loading large" />
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Inline usage</h3>
          <p className={classes.sectionDesc}>
            Use <code>Spinner</code> standalone or inside <code>Button</code> when{" "}
            <code>isLoading</code> is true (button passes its size to the
            spinner).
          </p>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Input</h2>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Default</h3>
          <div className={classes.inputRow}>
            <Input placeholder="Enter text…" />
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>With label</h3>
          <div className={classes.inputRow}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>With error</h3>
          <div className={classes.inputRow}>
            <Input
              label="Required field"
              required
              error="This field is required."
              placeholder="Type something"
            />
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Disabled</h3>
          <div className={classes.inputRow}>
            <Input label="Disabled" disabled placeholder="Disabled" />
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Card</h2>
        <div className={classes.cardsGrid}>
          <Card variant="default" padding="lg">
            <h4 className={classes.cardTitle}>Default</h4>
            <p className={classes.cardText}>
              Subtle border on primary surface. Use for grouped content.
            </p>
          </Card>
          <Card variant="outlined" padding="lg">
            <h4 className={classes.cardTitle}>Outlined</h4>
            <p className={classes.cardText}>
              Stronger border and secondary background. Use for emphasis or contrast.
            </p>
          </Card>
          <Card variant="elevated" padding="lg">
            <h4 className={classes.cardTitle}>Elevated</h4>
            <p className={classes.cardText}>
              Shadow for a raised look; shadow increases on hover.
            </p>
          </Card>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Padding</h3>
          <div className={classes.cardsRow}>
            <Card padding="none">
              <div className={classes.cardPaddingDemo}>padding: none</div>
            </Card>
            <Card padding="sm">
              <div className={classes.cardPaddingDemo}>sm</div>
            </Card>
            <Card padding="md">
              <div className={classes.cardPaddingDemo}>md</div>
            </Card>
            <Card padding="lg">
              <div className={classes.cardPaddingDemo}>lg</div>
            </Card>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Link</h2>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Variants</h3>
          <div className={classes.linkRow}>
            <Link href="/">Default</Link>
            <Link href="/" variant="primary">
              Primary
            </Link>
            <Link href="/" variant="underline">
              Underline
            </Link>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>With icon</h3>
          <div className={classes.linkRow}>
            <Link href="/" className={classes.linkWithIcon}>
              <HiOutlineHome />
              Home
            </Link>
            <Link href="/" variant="primary" className={classes.linkWithIcon}>
              <HiOutlineArrowRight />
              Get started
            </Link>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>
          <HiOutlineCog6Tooth className={classes.sectionIcon} aria-hidden />
          Icons
        </h2>
        <p className={classes.sectionDesc}>
          Heroicons 2 outline set from <code>react-icons/hi2</code>. Use for
          navigation, actions, and status.
        </p>
        <div className={classes.iconsGrid}>
          {[
            { Icon: HiOutlineUser, name: "HiOutlineUser" },
            { Icon: HiOutlineEnvelope, name: "HiOutlineEnvelope" },
            { Icon: HiOutlineHome, name: "HiOutlineHome" },
            { Icon: HiOutlineBookOpen, name: "HiOutlineBookOpen" },
            { Icon: HiOutlinePencilSquare, name: "HiOutlinePencilSquare" },
            { Icon: HiOutlineArrowRight, name: "HiOutlineArrowRight" },
            { Icon: HiOutlineCheck, name: "HiOutlineCheck" },
            { Icon: HiOutlineXMark, name: "HiOutlineXMark" },
            { Icon: HiOutlineBars3, name: "HiOutlineBars3" },
            { Icon: HiOutlineCog6Tooth, name: "HiOutlineCog6Tooth" },
            { Icon: HiOutlineHeart, name: "HiOutlineHeart" },
          ].map(({ Icon, name }) => (
            <div key={name} className={classes.iconCell}>
              <Icon className={classes.iconSvg} aria-hidden />
              <span className={classes.iconName}>{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Styleguide;
