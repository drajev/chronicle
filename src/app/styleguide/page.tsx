"use client";

import {
  Button,
  Card,
  Carousel,
  Input,
  Link,
  Skeleton,
  Spinner,
  VirtualScroll,
  type VirtualScrollRef,
} from "@/components/ui";
import { useIntersectionObserver } from "@/hooks";
import { ROUTES } from "@/lib/constants";
import { useRef, useState } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineBookOpen,
  HiOutlineCheck,
  HiOutlineHome,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import classes from "./page.module.scss";

const DEMO_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Virtual scroll renders only visible items for better performance.",
  "This list can later power a carousel of recent news.",
  "Each row is measured for accurate scroll height and positioning.",
  "Scroll to top, middle, or end using the buttons above.",
  ...Array.from(
    { length: 95 },
    (_, i) =>
      `Placeholder item ${i + 6}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  ),
];

const DEMO_CAROUSEL_ITEMS = [
  { title: "One", text: "First slide" },
  { title: "Two", text: "Second slide" },
  { title: "Three", text: "Third slide" },
  { title: "Four", text: "Fourth slide" },
  { title: "Five", text: "Fifth slide" },
];

const CAROUSEL_SKELETON_KEYS = ["cs-a", "cs-b", "cs-c", "cs-d", "cs-e"] as const;

const LazyCarouselDemo = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0,
    rootMargin: "50px",
    triggerOnce: true,
  });
  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Carousel
          items={DEMO_CAROUSEL_ITEMS}
          itemWidth={200}
          gap={16}
          ariaLabel="Demo carousel"
          prevLabel="Previous slide"
          nextLabel="Next slide"
          renderItem={(item) => (
            <Card variant="outlined" padding="md" className={classes.carouselCard}>
              <span className={classes.carouselCardTitle}>{item.title}</span>
              <p className={classes.carouselCardText}>{item.text}</p>
            </Card>
          )}
        />
      ) : (
        <div className={classes.carouselSkeleton} aria-hidden>
          <div className={classes.carouselSkeletonViewport}>
            <div className={classes.carouselSkeletonRow}>
              {CAROUSEL_SKELETON_KEYS.map((key) => (
                <div key={key} className={classes.carouselSkeletonSlot}>
                  <Skeleton variant="card" />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.carouselSkeletonControls}>
            <Skeleton variant="button-icon-sm" />
            <Skeleton variant="button-icon-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

const VIRTUAL_SCROLL_SKELETON_KEYS = ["vs-a", "vs-b", "vs-c", "vs-d", "vs-e"] as const;

const LazyVirtualScrollDemo = () => {
  const virtualScrollRef = useRef<VirtualScrollRef>(null);
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0,
    rootMargin: "50px",
    triggerOnce: true,
  });
  return (
    <div ref={ref} className={classes.virtualScrollLazyWrapper}>
      {isIntersecting ? (
        <>
          <div className={classes.virtualScrollToolbar}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => virtualScrollRef.current?.scrollToIndex(0)}
            >
              Scroll to top
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                virtualScrollRef.current?.scrollToIndex(Math.floor(DEMO_SENTENCES.length / 2))
              }
            >
              Scroll to middle
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => virtualScrollRef.current?.scrollToIndex(DEMO_SENTENCES.length - 1)}
            >
              Scroll to end
            </Button>
          </div>
          <VirtualScroll
            ref={virtualScrollRef}
            items={DEMO_SENTENCES}
            estimateSize={80}
            overscan={10}
            className={classes.virtualScrollArea}
            contentClassName={classes.virtualScrollContent}
            renderItem={({ index, measureRef, item }) => (
              <div ref={measureRef} data-index={index} className={classes.virtualScrollItem}>
                <div className={classes.virtualScrollItemContent}>
                  <div className={classes.virtualScrollItemInner}>
                    <p className={classes.virtualScrollItemText}>
                      <span className={classes.virtualScrollItemIndex}>{index + 1}.</span> {item}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
        </>
      ) : (
        <div className={classes.virtualScrollSkeleton}>
          <div className={classes.virtualScrollSkeletonToolbar}>
            <Skeleton variant="button-sm" />
            <Skeleton variant="button-sm" />
            <Skeleton variant="button-sm" />
          </div>
          <div className={classes.virtualScrollSkeletonList}>
            {VIRTUAL_SCROLL_SKELETON_KEYS.map((key) => (
              <div key={key} className={classes.virtualScrollSkeletonRow}>
                <Skeleton variant="list-line" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
          Explore components and patterns. Use the theme toggle in the header to switch light/dark.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Theme palette</h2>
        <p className={classes.sectionDesc}>
          Four base colors per theme. All semantic colors (text, surfaces, borders, accent) derive
          from these. Gradients and shadows use the same palette.
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
            <Button variant="secondary" icon={<HiOutlinePencilSquare />} iconPosition="left">
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
            <Button href={ROUTES.home}>As link</Button>
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
            <code>isLoading</code> is true (button passes its size to the spinner).
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
            <p className={classes.cardText}>Shadow for a raised look; shadow increases on hover.</p>
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
            <Link href={ROUTES.home}>Default</Link>
            <Link href={ROUTES.home} variant="primary">
              Primary
            </Link>
            <Link href={ROUTES.home} variant="underline">
              Underline
            </Link>
          </div>
        </div>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>With icon</h3>
          <div className={classes.linkRow}>
            <Link href={ROUTES.home} className={classes.linkWithIcon}>
              <HiOutlineHome />
              Home
            </Link>
            <Link href={ROUTES.home} variant="primary" className={classes.linkWithIcon}>
              <HiOutlineArrowRight />
              Get started
            </Link>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Virtual scroll</h2>
        <p className={classes.sectionDesc}>
          Virtualized list using ScrollArea and TanStack Virtual. Only visible rows are rendered.
          Use for long lists or future carousels (e.g. recent news). The list below is lazy-loaded
          with <code>useIntersectionObserver</code> and a <code>Skeleton</code> placeholder until
          you scroll to it.
        </p>
        <div className={classes.block}>
          <LazyVirtualScrollDemo />
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Carousel</h2>
        <p className={classes.sectionDesc}>
          Infinite horizontal carousel. Prev/next buttons below; loops last → first and first → last.
          Lazy-loaded with <code>useIntersectionObserver</code> and <code>Skeleton</code> until in
          view.
        </p>
        <div className={classes.block}>
          <LazyCarouselDemo />
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Skeleton</h2>
        <p className={classes.sectionDesc}>
          Placeholder for loading content. Use with <code>useIntersectionObserver</code> for
          lazy-loaded sections.
        </p>
        <div className={classes.block}>
          <h3 className={classes.blockTitle}>Variants</h3>
          <div className={classes.skeletonDemo}>
            <Skeleton variant="text" typography="body2" fullWidth className={classes.skeletonLine} />
            <Skeleton variant="text" typography="body2" width="80%" className={classes.skeletonLine} />
            <Skeleton variant="text" typography="body2" width="60%" className={classes.skeletonLine} />
          </div>
          <div className={classes.skeletonComponentVariants}>
            <h4 className={classes.skeletonVariantSubtitle}>Component-matching</h4>
            <div className={classes.skeletonCardRow}>
              <div className={classes.skeletonCardSlot}>
                <Skeleton variant="card" />
              </div>
              <div className={classes.skeletonCardSlot}>
                <Skeleton variant="card" />
              </div>
            </div>
            <div className={classes.skeletonButtonRow}>
              <Skeleton variant="button-sm" />
              <Skeleton variant="button-icon-sm" />
              <Skeleton variant="button-icon-sm" />
            </div>
            <div className={classes.skeletonListLineRow}>
              <Skeleton variant="list-line" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Styleguide;
