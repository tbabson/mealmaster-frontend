import Wrapper from "../assets/wrappers/LandingSection";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { formatPrice } from "../utils/formatPrice";
import {
  FaUtensils, FaBell, FaTruck, FaStar,
  FaQuoteLeft, FaArrowRight, FaShoppingCart, FaMapMarkerAlt,
} from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaUtensils />,
    color: "green",
    title: "500+ Recipes",
    desc: "From quick weeknight dinners to elaborate weekend feasts — all with step-by-step guides.",
  },
  {
    icon: <FaBell />,
    color: "orange",
    title: "Smart Reminders",
    desc: "Never miss a meal time. Schedule alerts that work perfectly around your day.",
  },
  {
    icon: <FaTruck />,
    color: "blue",
    title: "Fast Delivery",
    desc: "Fresh meals delivered to your door, tracked every step of the way.",
  },
  {
    icon: <FaStar />,
    color: "yellow",
    title: "4.8★ Rated",
    desc: "Thousands of happy customers trust Meal Master for their daily meals.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: <FaUtensils />,
    title: "Browse Meals",
    desc: "Explore our full menu, filter by category, dietary needs, or budget.",
  },
  {
    num: "02",
    icon: <FaShoppingCart />,
    title: "Add to Cart",
    desc: "Pick your favourites and customise your order with ease.",
  },
  {
    num: "03",
    icon: <FaMapMarkerAlt />,
    title: "Get Delivered",
    desc: "Sit back — your fresh meal is on its way to your door.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amaka O.",
    location: "Lagos",
    quote:
      "Meal Master completely changed how I eat. The recipes are incredibly detailed and delivery is always on time!",
    rating: 5,
  },
  {
    name: "Chukwudi I.",
    location: "Abuja",
    quote:
      "The reminders feature alone is worth it. I never forget to prep dinner anymore. Absolutely love this app!",
    rating: 5,
  },
  {
    name: "Funke A.",
    location: "Port Harcourt",
    quote:
      "I love how easy it is to browse by dietary needs. Found so many healthy options I actually enjoy eating.",
    rating: 4,
  },
];

const Stars = ({ count }) => (
  <div className="stars-row">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < count ? "star filled" : "star"} />
    ))}
  </div>
);

const LandingSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landingMeals"],
    queryFn: async () => {
      const { data } = await customFetch.get("/meals?limit=6&sort=newest");
      return data.meals || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const meals = data || [];

  return (
    <Wrapper>
      {/* ═══════════════════════════════════════════════
          FEATURE STRIP
      ═══════════════════════════════════════════════ */}
      <section className="features-section">
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className={`feat-icon feat-${f.color}`}>{f.icon}</span>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED MEALS
      ═══════════════════════════════════════════════ */}
      <section className="meals-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Fresh &amp; Delicious</span>
              <h2 className="section-title light">Featured Meals</h2>
            </div>
            <Link to="/meals" className="view-all-link">
              View All <FaArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="meals-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="meal-card-sk" />
              ))}
            </div>
          ) : meals.length > 0 ? (
            <div className="meals-grid">
              {meals.map((meal) => (
                <Link to={`/meals/${meal._id}`} key={meal._id} className="meal-card">
                  <div className="meal-img-wrap">
                    {meal.image || meal.images?.[0] ? (
                      <img
                        src={meal.image || meal.images[0]}
                        alt={meal.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="meal-img-placeholder" />
                    )}
                    {meal.category && (
                      <span className="meal-cat">{meal.category}</span>
                    )}
                  </div>
                  <div className="meal-body">
                    <h3 className="meal-name">{meal.name}</h3>
                    <div className="meal-footer">
                      <span className="meal-price">
                        {formatPrice(
                          (meal.ingredients || []).reduce(
                            (sum, ing) => sum + (ing.price || 0) * (ing.quantity || 0),
                            0
                          )
                        )}
                      </span>
                      <span className="order-hint">
                        Order <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="meals-cta">
            <Link to="/meals" className="btn-explore">
              Explore All Meals
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════ */}
      <section className="how-section">
        <div className="section-inner">
          <div className="section-head centered">
            <span className="section-eyebrow">Simple as 1-2-3</span>
            <h2 className="section-title dark">How It Works</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.num} className="step-card">
                <div className="step-num">{s.num}</div>
                <div className="step-icon-wrap">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="step-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-head centered">
            <span className="section-eyebrow">What People Say</span>
            <h2 className="section-title dark">Loved by Thousands</h2>
          </div>
          <div className="reviews-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="review-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="review-text">"{t.quote}"</p>
                <div className="review-footer">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{t.name[0]}</div>
                    <div>
                      <p className="reviewer-name">{t.name}</p>
                      <p className="reviewer-loc">{t.location}</p>
                    </div>
                  </div>
                  <Stars count={t.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA BANNER
      ═══════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <span className="cta-eyebrow">Don't wait any longer</span>
          <h2 className="cta-title">Ready to Eat Better?</h2>
          <p className="cta-sub">
            Join thousands of food lovers who've upgraded their meal experience
            with Meal Master.
          </p>
          <div className="cta-buttons">
            <Link to="/meals" className="cta-btn-primary">
              Order Now
            </Link>
            <Link to="/register" className="cta-btn-ghost">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default LandingSection;
