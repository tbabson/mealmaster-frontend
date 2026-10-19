import { motion, useReducedMotion } from "framer-motion";

// Endless horizontal ticker. The content is rendered twice and the track
// slides by exactly one copy, so the loop has no visible seam.
const Marquee = ({ children, duration = 30, className = "" }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee-track"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
