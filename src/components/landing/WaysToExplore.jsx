import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Eyebrow, Reveal } from "..";
import useLandingMeals from "./useLandingMeals";
import Wrapper from "../../assets/wrappers/landing/WaysToExplore";

const WAYS = [
  {
    num: "01",
    title: "Discovery",
    body: "Browse dishes, ingredients and cuisines from around the world to broaden your repertoire.",
    tags: "New finds • inspiration • ideas",
    to: "/meals",
    cta: "Browse meals",
    tone: "soft",
  },
  {
    num: "02",
    title: "Rhythm",
    body: "Schedule meal reminders by email, push or calendar so eating well fits around your day.",
    tags: "Routine • reminders • convenience",
    to: "/reminders",
    cta: "Set a reminder",
    tone: "green",
  },
  {
    num: "03",
    title: "Insight",
    body: "See calories and macros for what you order, and get suggestions that match your goals.",
    tags: "Nutrition • balance • goals",
    to: "/nutrition",
    cta: "View nutrition",
    tone: "cream",
  },
];

const WayCard = ({ way, image, index, progress }) => {
  // Cards further back shrink slightly as later cards slide over them
  const scale = useTransform(progress, [index / WAYS.length, 1], [1, 1 - (WAYS.length - index - 1) * 0.05]);
  return (
    <motion.article
        className={`way-card tone-${way.tone}`}
        style={{ scale, top: `calc(6.5rem + ${index * 1.75}rem)` }}
      >
        <div className="way-copy">
          <span className="way-num">{way.num}</span>
          <h3>{way.title}</h3>
          <p>{way.body}</p>
          <div className="way-foot">
            <span className="way-tags">{way.tags}</span>
            <Link to={way.to} className="way-link">
              {way.cta} <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="way-media">
          {image ? <img src={image} alt="" loading="lazy" /> : <div className="media-fallback" />}
        </div>
      </motion.article>
  );
};

const WaysToExplore = () => {
  const { meals } = useLandingMeals();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const photos = meals.filter((m) => m.cover).map((m) => m.cover);

  return (
    <Wrapper>
      <div className="mm-container">
        <Reveal className="section-heading" stagger={0.1}>
          <Reveal.Item><Eyebrow tone="onColor">Three ways to explore</Eyebrow></Reveal.Item>
          <Reveal.Item as="h2">Choose the starting point that fits your moment.</Reveal.Item>
          <Reveal.Item as="p">
            Start with something new, build a steady routine, or understand
            exactly what is on your plate.
          </Reveal.Item>
        </Reveal>

        <div className="ways" ref={ref}>
          {WAYS.map((way, i) => (
            <WayCard
              key={way.num}
              way={way}
              index={i}
              progress={scrollYProgress}
              image={photos.length ? photos[(i + 2) % photos.length] : null}
            />
          ))}
        </div>

        <p className="fine-print">One menu, three ways to explore.</p>
      </div>
    </Wrapper>
  );
};

export default WaysToExplore;
