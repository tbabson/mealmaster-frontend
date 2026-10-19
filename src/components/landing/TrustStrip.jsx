import { motion } from "framer-motion";
import { FiBookOpen, FiBell, FiTruck, FiPieChart } from "react-icons/fi";
import Wrapper from "../../assets/wrappers/landing/TrustStrip";

const CHIPS = [
  { Icon: FiBookOpen, label: "Step-by-step recipes" },
  { Icon: FiBell, label: "Smart meal reminders" },
  { Icon: FiTruck, label: "Doorstep delivery" },
  { Icon: FiPieChart, label: "Nutrition insights" },
];

const TrustStrip = () => (
  <Wrapper>
    <p className="strip-title">Designed for your routine</p>
    <motion.ul
      className="chips"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {CHIPS.map(({ Icon, label }) => (
        <motion.li
          key={label}
          className="chip"
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ y: -3 }}
        >
          <Icon aria-hidden="true" />
          {label}
        </motion.li>
      ))}
    </motion.ul>
  </Wrapper>
);

export default TrustStrip;
