import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { Eyebrow, Reveal } from "..";
import { formatPrice } from "../../utils/formatPrice";
import useLandingMeals from "./useLandingMeals";
import Wrapper from "../../assets/wrappers/landing/MenuShowcase";

const MotionLink = motion.create(Link);

const MenuShowcase = () => {
  const { meals, isLoading } = useLandingMeals();
  const items = meals.slice(0, 6);

  return (
    <Wrapper id="menu">
      <div className="mm-container">
        <Reveal className="section-heading on-dark" stagger={0.1}>
          <Reveal.Item><Eyebrow tone="dark">Dishes to explore</Eyebrow></Reveal.Item>
          <Reveal.Item as="h2">A menu that begins with the eyes.</Reveal.Item>
          <Reveal.Item as="p">
            Browse fresh dishes side by side. Compare styles, ingredients and
            prices, then order the one that works for you today.
          </Reveal.Item>
        </Reveal>

        <Reveal className="menu-grid" stagger={0.08} amount={0.1}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="menu-card is-skeleton" />
              ))
            : items.map((meal) => (
                <Reveal.Item key={meal._id}>
                  <MotionLink
                    to={`/meals/${meal._id}`}
                    className="menu-card"
                    whileHover="hover"
                  >
                    <div className="card-media">
                      {meal.cover ? (
                        <motion.img
                          src={meal.cover}
                          alt={meal.name}
                          loading="lazy"
                          variants={{ hover: { scale: 1.06 } }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ) : (
                        <div className="media-fallback" />
                      )}
                      {meal.mealType && <span className="card-badge">{meal.mealType}</span>}
                    </div>
                    <div className="card-body">
                      <h3>{meal.name}</h3>
                      <div className="card-foot">
                        <span className="card-price">{formatPrice(meal.price)}</span>
                        <span className="card-cta">
                          Order now
                          <motion.span variants={{ hover: { x: 3, y: -3 } }}>
                            <FiArrowUpRight aria-hidden="true" />
                          </motion.span>
                        </span>
                      </div>
                    </div>
                  </MotionLink>
                </Reveal.Item>
              ))}
        </Reveal>

        <div className="menu-foot">
          <p className="fine-print">Photos, ingredients and prices in one place.</p>
          <Link to="/meals" className="arrow-link">
            See the full menu <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default MenuShowcase;
