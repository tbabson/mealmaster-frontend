import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eyebrow, Logo } from ".";
import useLandingMeals from "./landing/useLandingMeals";
import PublicStyles from "../assets/wrappers/PublicStyles";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

const ease = [0.22, 1, 0.36, 1];

const mealOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "breakfast";
  if (hour >= 12 && hour < 17) return "lunch";
  return "dinner";
};

// Split-screen frame for the login and register pages
const AuthShell = ({ title, subtitle, visualTitle, visualTagline, children }) => {
  const { meals } = useLandingMeals();
  const photos = meals.filter((m) => m.cover);
  const [index, setIndex] = useState(0);

  // Slowly cycle the background photo
  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 5000);
    return () => clearInterval(id);
  }, [photos.length]);

  const photo = photos[index];

  return (
    <MotionConfig reducedMotion="user">
      <PublicStyles />
      <Wrapper className="public-site">
        <aside className="auth-visual">
          <AnimatePresence mode="popLayout">
            {photo && (
              <motion.img
                key={photo._id}
                src={photo.cover}
                alt=""
                className="visual-photo"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease }}
              />
            )}
          </AnimatePresence>
          <div className="visual-shade" />

          <Link to="/" className="auth-logo" aria-label="MealMaster home">
            <Logo />
          </Link>

          <motion.div
            className="visual-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <Eyebrow tone="dark">Eat well · Keep it simple</Eyebrow>
            <h2>{visualTitle || `Don't know what to cook for ${mealOfDay()}?`}</h2>
            <p>{visualTagline || "We've got you covered."}</p>
            {photo && <span className="photo-caption">{photo.name}</span>}
          </motion.div>
        </aside>

        <main className="auth-main">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <Link to="/" className="auth-logo-mobile" aria-label="MealMaster home">
              <Logo />
            </Link>
            <h1>{title}</h1>
            {subtitle && <p className="auth-sub">{subtitle}</p>}
            {children}
          </motion.div>
        </main>
      </Wrapper>
    </MotionConfig>
  );
};

export default AuthShell;
