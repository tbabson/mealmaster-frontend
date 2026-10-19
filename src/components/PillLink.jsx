import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const MotionLink = motion.create(Link);

// Rounded call-to-action with a circular arrow badge, as used across the site
const PillLink = ({ to, children, tone = "dark", className = "", ...rest }) => (
  <MotionLink
    to={to}
    className={`pill-link pill-${tone} ${className}`}
    whileHover="hover"
    whileTap={{ scale: 0.97 }}
    {...rest}
  >
    <span>{children}</span>
    <motion.span
      className="pill-arrow"
      variants={{ hover: { x: 4, rotate: -45 } }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <FiArrowRight aria-hidden="true" />
    </motion.span>
  </MotionLink>
);

export default PillLink;
