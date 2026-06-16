import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => (
  <Wrapper>
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-inner">
        <span className="hero-eyebrow">Nigeria's #1 Meal Platform</span>
        <h1 className="hero-title">
          Cook, Schedule &amp; Order.
          <br className="title-br" />
          All in One Place.
        </h1>
        <p className="hero-sub">
          Discover hundreds of recipes, set meal reminders, and have fresh meals
          delivered straight to your door.
        </p>
        <div className="hero-ctas">
          <Link to="/meals" className="cta-primary">
            Explore Meals
          </Link>
          <Link to="/blog" className="cta-ghost">
            Read Blogs <FaArrowRight className="cta-arrow" />
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Meals</span>
          </div>
          <span className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">4.8★</span>
            <span className="stat-label">Rating</span>
          </div>
          <span className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">1,200+</span>
            <span className="stat-label">Happy Orders</span>
          </div>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default Hero;
