import { motion } from "framer-motion";
import { PiSparkleFill } from "react-icons/pi";
import { Eyebrow, Reveal } from "..";
import Wrapper from "../../assets/wrappers/landing/HowItWorks";

const STEPS = [
  { title: "Define what you want", body: "Variety, something quick, or a new cuisine to try.", tone: "soft" },
  { title: "Explore the menu", body: "Compare photos, ingredients, prices and nutrition.", tone: "white" },
  { title: "Add it to your cart", body: "Adjust quantities and swap ingredients to suit you.", tone: "orange" },
  { title: "Get it delivered", body: "Pay securely and track your order to your door.", tone: "green" },
];

const HowItWorks = () => (
  <Wrapper id="how-it-works">
    <div className="mm-container">
      <Reveal className="section-heading centered" stagger={0.1}>
        <Reveal.Item><Eyebrow>How it works</Eyebrow></Reveal.Item>
        <Reveal.Item as="h2">From idea to plate in four simple steps.</Reveal.Item>
        <Reveal.Item as="p">
          Decide what you&apos;re in the mood for, compare dishes, and let us
          handle the rest.
        </Reveal.Item>
      </Reveal>

      <Reveal className="steps" stagger={0.1} amount={0.15}>
        {STEPS.map((step, i) => (
          <Reveal.Item key={step.title}>
            <motion.article
              className={`step tone-${step.tone}`}
              whileHover={{ y: -6, rotate: i % 2 ? 0.6 : -0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="step-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <PiSparkleFill aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </motion.article>
          </Reveal.Item>
        ))}
      </Reveal>
    </div>
  </Wrapper>
);

export default HowItWorks;
