import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Eyebrow, Reveal } from "..";
import Wrapper from "../../assets/wrappers/landing/Faq";

const FAQS = [
  {
    q: "What is MealMaster?",
    a: "MealMaster is a meal platform that brings recipes, meal reminders, nutrition insights and fresh delivery together in one place.",
  },
  {
    q: "How do I order a meal?",
    a: "Open the menu, pick a dish, adjust the ingredients you want, then add it to your cart and check out. You can track the order from your Orders page.",
  },
  {
    q: "Can I set reminders for meal times?",
    a: "Yes. Create a reminder and choose email, push notification or a calendar invite, once or on a repeating schedule.",
  },
  {
    q: "Where can I find nutritional information?",
    a: "Each meal page shows its nutrition facts, and the Nutrition page summarises what you have ordered against your goals.",
  },
  {
    q: "How does delivery work?",
    a: "Enter your delivery address at checkout. Delivery details and fees are confirmed there before you pay, and you can follow the order's progress afterwards.",
  },
  {
    q: "How can I get started?",
    a: "Create a free account, browse the menu and place your first order. It only takes a couple of minutes.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <Wrapper>
      <div className="faq-inner mm-container">
        <Reveal className="faq-head" stagger={0.1}>
          <Reveal.Item><Eyebrow>Frequently asked questions</Eyebrow></Reveal.Item>
          <Reveal.Item as="h2">What you need to know before choosing.</Reveal.Item>
          <Reveal.Item as="p">
            Quick answers to help you explore the menu and know what to expect
            when you order.
          </Reveal.Item>
        </Reveal>

        <Reveal className="faq-list" stagger={0.06} amount={0.15}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal.Item key={item.q} className="faq-item">
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <motion.span
                      className="faq-icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <FiPlus aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal.Item>
            );
          })}
        </Reveal>
      </div>
    </Wrapper>
  );
};

export default Faq;
