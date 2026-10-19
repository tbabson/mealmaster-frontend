import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiClock, FiSliders, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { Eyebrow, Reveal } from "..";
import Wrapper from "../../assets/wrappers/landing/Routine";

const CARDS = [
  {
    Icon: FiClock,
    tag: "01 / Overload",
    title: "Too many options is exhausting too.",
    body: "Endless lists, trends and rules turn an everyday decision into one more chore.",
    tone: "orange",
  },
  {
    Icon: FiSliders,
    tag: "02 / Preferences",
    title: "Your context shapes your choices.",
    body: "Tastes, schedules and diets change. MealMaster offers starting points, not a single formula.",
    tone: "soft",
  },
  {
    Icon: FiCheckCircle,
    tag: "03 / Clarity",
    title: "Better choices begin with a clearer view.",
    body: "Photos, ingredients and prices side by side make it easy to compare before you order.",
    tone: "green",
  },
];

// Each card pins a little lower than the one before, so they pile up as you scroll
const Card = ({ card, index, total, progress }) => {
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const { Icon } = card;
  return (
    <motion.article
      className={`story-card tone-${card.tone}`}
      style={{ top: `calc(7rem + ${index * 1.5}rem)`, scale }}
    >
      <Icon className="card-icon" aria-hidden="true" />
      <span className="card-tag">{card.tag}</span>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </motion.article>
  );
};

const Routine = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <Wrapper>
      <div className="routine-inner mm-container">
        <Reveal className="routine-copy" stagger={0.1}>
          <Reveal.Item><Eyebrow>A routine with more clarity</Eyebrow></Reveal.Item>
          <Reveal.Item as="h2">
            It isn&apos;t about motivation. It&apos;s about finding a path that fits real life.
          </Reveal.Item>
          <Reveal.Item as="p">
            Between too many ideas and too little reliable information, deciding
            what to eat becomes another task. MealMaster brings recipes, prices
            and reminders together to make that decision simpler.
          </Reveal.Item>
          <Reveal.Item>
            <a href="#how-it-works" className="arrow-link">
              See how it works <FiArrowRight aria-hidden="true" />
            </a>
          </Reveal.Item>
        </Reveal>

        <div className="story-cards" ref={ref}>
          {CARDS.map((card, i) => (
            <Card key={card.tag} card={card} index={i} total={CARDS.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Routine;
