import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, PillLink, Reveal } from "..";
import useLandingMeals from "./useLandingMeals";
import Wrapper from "../../assets/wrappers/landing/FoodLanguage";

// Where each floating photo sits, and how far it drifts while the section scrolls past
const FLOATERS = [
  { className: "f1", rotate: -8, drift: -120 },
  { className: "f2", rotate: 6, drift: -60 },
  { className: "f3", rotate: 10, drift: -160 },
  { className: "f4", rotate: -5, drift: -90 },
];

const Floater = ({ src, spec, progress }) => {
  const y = useTransform(progress, [0, 1], [0, spec.drift]);
  return (
    <motion.div className={`floater ${spec.className}`} style={{ y, rotate: spec.rotate }}>
      <img src={src} alt="" loading="lazy" />
    </motion.div>
  );
};

const FoodLanguage = () => {
  const { meals } = useLandingMeals();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photos = meals.filter((m) => m.cover).map((m) => m.cover);

  return (
    <Wrapper ref={ref}>
      {photos.length > 0 &&
        FLOATERS.map((spec, i) => (
          <Floater
            key={spec.className}
            spec={spec}
            progress={scrollYProgress}
            src={photos[(i + 1) % photos.length]}
          />
        ))}

      <Reveal className="section-heading centered" stagger={0.1}>
        <Reveal.Item><Eyebrow>Food is a language too</Eyebrow></Reveal.Item>
        <Reveal.Item as="h2">Dishes that inspire new ideas.</Reveal.Item>
        <Reveal.Item as="p">
          Notice the colours, ingredients and combinations, and let them nudge
          you out of autopilot.
        </Reveal.Item>
        <Reveal.Item>
          <PillLink to="/meals" tone="dark">View featured dishes</PillLink>
        </Reveal.Item>
      </Reveal>
    </Wrapper>
  );
};

export default FoodLanguage;
