import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Wrapper from "../assets/wrappers/Meal";
import { FaStar, FaLeaf } from "react-icons/fa";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";

const MotionLink = motion.create(Link);

const Meal = ({ _id, image, name, mealType, country, dietary, ingredients = [], averageRating = 0 }) => {
  const price = (ingredients || []).reduce(
    (sum, ing) => sum + (ing.price || 0) * (ing.quantity || 0),
    0
  );

  const dietaryArr = Array.isArray(dietary)
    ? dietary.filter(Boolean)
    : [dietary].filter(Boolean);

  const displayDietary = dietaryArr.find((d) => d !== "none") || null;

  return (
    <Wrapper
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionLink to={`/meals/${_id}`} className="meal-card" whileHover="hover">
        <div className="card-image">
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="type-badge">{mealType}</span>
          {averageRating > 0 && (
            <span className="rating-badge">
              <FaStar className="star-icon" />
              {averageRating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="card-body">
          <h3 className="meal-name">{name}</h3>
          <div className="card-meta">
            {country && (
              <span className="meta-country">
                <FiMapPin className="meta-icon" />
                {country}
              </span>
            )}
            {displayDietary && (
              <span className="dietary-chip">
                <FaLeaf className="leaf-icon" />
                {displayDietary}
              </span>
            )}
          </div>
          <div className="card-foot">
            {price > 0 && <span className="card-price">{formatPrice(price)}</span>}
            <span className="card-cta">
              View recipe
              <motion.span variants={{ hover: { x: 3, y: -3 } }}>
                <FiArrowUpRight aria-hidden="true" />
              </motion.span>
            </span>
          </div>
        </div>
      </MotionLink>
    </Wrapper>
  );
};

export default Meal;
