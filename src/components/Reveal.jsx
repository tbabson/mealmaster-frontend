import { motion } from "framer-motion";

// Fades and lifts its children into place the first time they scroll into view.
// `stagger` turns direct <Reveal.Item> children into a cascade.
const variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const Reveal = ({
  as = "div",
  delay = 0,
  stagger,
  amount = 0.25,
  className,
  children,
  ...rest
}) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={
        stagger
          ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
          : { ...variants, show: { ...variants.show, transition: { ...variants.show.transition, delay } } }
      }
      {...rest}
    >
      {children}
    </Component>
  );
};

const Item = ({ as = "div", className, children, ...rest }) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants} {...rest}>
      {children}
    </Component>
  );
};

Reveal.Item = Item;

export default Reveal;
