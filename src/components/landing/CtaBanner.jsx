import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Eyebrow, PillLink, Reveal } from "..";
import Wrapper from "../../assets/wrappers/landing/CtaBanner";

const CtaBanner = () => {
  const user = useSelector((state) => state.user?.user);

  return (
    <Wrapper>
      <Reveal className="section-heading centered" stagger={0.1}>
        <Reveal.Item><Eyebrow tone="onColor">Ready to explore?</Eyebrow></Reveal.Item>
        <Reveal.Item as="h2">Find an idea for your next meal.</Reveal.Item>
        <Reveal.Item as="p">
          Explore the menu, compare dishes, and choose the one that best fits
          your moment.
        </Reveal.Item>
        <Reveal.Item className="cta-row">
          <PillLink to="/meals" tone="light">Explore the menu</PillLink>
          {user ? (
            <Link to="/reminders" className="arrow-link">Plan with reminders →</Link>
          ) : (
            <Link to="/register" className="arrow-link">Create a free account →</Link>
          )}
        </Reveal.Item>
      </Reveal>
    </Wrapper>
  );
};

export default CtaBanner;
