import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TbHandFinger } from "react-icons/tb";
import { Eyebrow, Marquee, PillLink } from "..";
import useLandingMeals from "./useLandingMeals";
import Wrapper from "../../assets/wrappers/landing/Hero";

const TICKER = ["Eat well", "Keep it simple", "Choose with intention", "Order in minutes"];
const ease = [0.22, 1, 0.36, 1];

// Resting pose for each depth in the stack: front card straight, the rest fanned behind it
const POSES = [
  { rotate: 0, x: 0, y: 0, scale: 1 },
  { rotate: -6, x: -46, y: 18, scale: 0.94 },
  { rotate: 7, x: 52, y: 30, scale: 0.88 },
  { rotate: -3, x: -8, y: 44, scale: 0.82 },
];

const Hero = () => {
  const { meals } = useLandingMeals();
  const [stack, setStack] = useState([]);

  useEffect(() => {
    setStack(meals.filter((m) => m.cover).slice(0, 4));
  }, [meals]);

  // Flicking the front card sends it to the back of the pile
  const sendToBack = () => setStack(([first, ...rest]) => [...rest, first]);

  return (
    <Wrapper>
      <div className="hero-inner mm-container">
        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <Eyebrow tone="dark">Cook · Schedule · Order</Eyebrow>
          </motion.div>

          <h1 className="hero-title">
            {["Discover meals that", "fit your routine."].map((line, i) => (
              <span className="line" key={line}>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.3 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
          >
            MealMaster brings recipes, meal reminders and fresh delivery
            together. Explore the dishes and find the combinations that make
            sense for you.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
          >
            <PillLink to="/meals" tone="orange">Explore the menu</PillLink>
            <a href="#how-it-works" className="arrow-link">How it works →</a>
          </motion.div>
        </div>

        <motion.div
          className="stack-area"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
        >
          <div className="stack">
            <AnimatePresence initial={false}>
              {stack
                .map((meal, depth) => (
                  <motion.div
                    key={meal._id}
                    className="stack-card"
                    style={{ zIndex: stack.length - depth }}
                    initial={{ opacity: 0, scale: 0.8, y: 60 }}
                    animate={{ opacity: 1, ...POSES[depth] }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    drag={depth === 0 ? "x" : false}
                    dragSnapToOrigin
                    dragElastic={0.6}
                    whileDrag={{ scale: 1.03, cursor: "grabbing" }}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) sendToBack();
                    }}
                  >
                    <img src={meal.cover} alt={meal.name} draggable="false" />
                    <div className="card-meta">
                      <span>{meal.mealType}</span>
                      <Link to={`/meals/${meal._id}`} onPointerDown={(e) => e.stopPropagation()}>
                        {meal.name}
                      </Link>
                    </div>
                  </motion.div>
                ))
                .reverse()}
            </AnimatePresence>
            {stack.length === 0 && <div className="stack-card is-placeholder" />}
          </div>
          <span className="drag-hint">
            <TbHandFinger aria-hidden="true" /> Drag to explore
          </span>
        </motion.div>
      </div>

      <Marquee className="hero-ticker" duration={28}>
        {TICKER.map((word) => (
          <span key={word} className="ticker-word">
            {word} <span className="dot">•</span>
          </span>
        ))}
      </Marquee>
    </Wrapper>
  );
};

export default Hero;
