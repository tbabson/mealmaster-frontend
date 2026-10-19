import { motion } from "framer-motion";
import styled from "styled-components";
import Eyebrow from "./Eyebrow";

const ease = [0.22, 1, 0.36, 1];

// Dark rounded banner that opens each inner page of the public site
const PageHeader = ({ eyebrow, title, subtitle, children, tone = "ink" }) => (
  <Wrapper className={`tone-${tone}`}>
    <div className="glow" aria-hidden="true" />
    <motion.div
      className="ph-copy"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {eyebrow && (
        <motion.div variants={item}>
          <Eyebrow tone={tone === "ink" ? "dark" : "light"}>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h1 variants={item}>{title}</motion.h1>
      {subtitle && <motion.p variants={item}>{subtitle}</motion.p>}
      {children && (
        <motion.div className="ph-actions" variants={item}>
          {children}
        </motion.div>
      )}
    </motion.div>
  </Wrapper>
);

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const Wrapper = styled.header`
  position: relative;
  width: min(1200px, 100%);
  margin: 0 auto 2.5rem;
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
  border-radius: 2rem;
  overflow: hidden;

  &.tone-ink { background: var(--ink); color: var(--ink-text); }
  &.tone-soft { background: var(--surface-soft); color: var(--text-primary); }

  .glow {
    position: absolute;
    right: -10%;
    bottom: -60%;
    width: 60%;
    aspect-ratio: 1;
    background: radial-gradient(closest-side, rgba(53, 132, 56, 0.45), transparent);
    pointer-events: none;
  }
  &.tone-soft .glow {
    background: radial-gradient(closest-side, rgba(255, 87, 34, 0.18), transparent);
  }

  .ph-copy {
    position: relative;
    display: grid;
    justify-items: start;
    gap: 1rem;
    max-width: 46rem;
  }

  h1 { font-size: clamp(2.4rem, 6vw, 4.5rem); color: inherit; }

  p {
    max-width: 34rem;
    font-size: 1.05rem;
    opacity: 0.75;
  }

  .ph-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
`;

export default PageHeader;
