import { motion } from "framer-motion";
import { FiTarget, FiSliders } from "react-icons/fi";
import { PiSparkle } from "react-icons/pi";
import { Eyebrow, Reveal } from "..";
import Wrapper from "../../assets/wrappers/landing/Experience";

const ROWS = [
  {
    Icon: FiTarget,
    title: "Compare with ease",
    body: "Photos, ingredients and prices in one place make comparing options effortless.",
  },
  {
    Icon: FiSliders,
    title: "Eat at your own pace",
    body: "Order today, schedule a reminder for later, or plan the whole week ahead.",
  },
  {
    Icon: PiSparkle,
    title: "Broaden your repertoire",
    body: "New dishes and cuisines help you move beyond the same few meals.",
  },
];

const Experience = () => (
  <Wrapper>
    <div className="mm-container">
      <Reveal className="section-heading centered on-dark" stagger={0.1}>
        <Reveal.Item><Eyebrow tone="dark">What changes in the experience</Eyebrow></Reveal.Item>
        <Reveal.Item as="h2">Less time searching. More clarity to choose.</Reveal.Item>
      </Reveal>

      <Reveal className="rows" stagger={0.12} amount={0.2}>
        {ROWS.map(({ Icon, title, body }) => (
          <Reveal.Item key={title}>
            <motion.article className="row" whileHover="hover">
              <motion.span
                className="row-icon"
                variants={{ hover: { rotate: 90, scale: 1.1 } }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                <Icon aria-hidden="true" />
              </motion.span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          </Reveal.Item>
        ))}
      </Reveal>

      <p className="fine-print">
        Nutrition information is a guide and does not replace professional advice.
      </p>
    </div>
  </Wrapper>
);

export default Experience;
