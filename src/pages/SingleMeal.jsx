import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import Wrapper from "../assets/wrappers/SingleMeal";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Features/Cart/cartSlice";
import { Loading } from "../components";
import { toast } from "react-toastify";
import { GiHotMeal } from "react-icons/gi";
import { FaShoppingCart, FaBell, FaLeaf, FaFire, FaCheckCircle } from "react-icons/fa";

const SingleMeal = () => {
  const { meal } = useLoaderData();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  if (navigation.state === "loading") return <Loading variant="single-meal" />;
  if (!meal) return <div>No meal data found</div>;

  const {
    _id, image, name, mealType, country, dietary,
    ingredients = [], preparationSteps = [],
    price, reviews = [], numOfReviews, averageRating,
  } = meal.meal;

  const dietaryTags = Array.isArray(dietary)
    ? dietary
    : [dietary].filter(Boolean);

  const cartMeal = { _id, name, image, country, mealType, ingredients };

  const addToCart = () => {
    if (!user?.user) {
      toast.error("Log in to add items to your cart.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    dispatch(addItem({ meal: cartMeal }));
  };

  const handleCreateReminder = () => {
    if (!user?.user) {
      toast.error("Log in to create a reminder.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    navigate("/create-reminders", { state: { meal: meal.meal } });
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating) ? (
        <IoMdStar key={i} className="star filled" />
      ) : (
        <IoMdStarOutline key={i} className="star" />
      )
    );

  const totalSteps = preparationSteps.reduce(
    (acc, ps) => acc + (ps.steps?.length || 0),
    0
  );

  return (
    <Wrapper>
      {/* ═══════════════════════════════════════════════
          TOP: image + info side by side
      ═══════════════════════════════════════════════ */}
      <div className="top-section">

        {/* Image column (sticky on desktop) */}
        <div className="img-col">
          <div className="meal-img-wrap">
            {image ? (
              <img src={image} alt={name} />
            ) : (
              <div className="img-placeholder">
                <GiHotMeal />
              </div>
            )}
          </div>

          {/* Quick-stat bar */}
          <div className="quick-stats">
            <div className="qs-item">
              <span className="qs-label">Type</span>
              <span className="qs-value">{mealType || "—"}</span>
            </div>
            <span className="qs-sep" />
            <div className="qs-item">
              <span className="qs-label">Origin</span>
              <span className="qs-value">{country || "—"}</span>
            </div>
            <span className="qs-sep" />
            <div className="qs-item">
              <span className="qs-label">Ingredients</span>
              <span className="qs-value">{ingredients.length}</span>
            </div>
          </div>
        </div>

        {/* Info column */}
        <div className="info-col">
          <h1 className="meal-title">{name}</h1>

          {dietaryTags.length > 0 && (
            <div className="dietary-tags">
              {dietaryTags.map((tag) => (
                <span key={tag} className="diet-tag">
                  <FaLeaf /> {tag}
                </span>
              ))}
            </div>
          )}

          <div className="rating-row">
            <div className="stars">{renderStars(averageRating)}</div>
            <span className="rating-num">
              {Number(averageRating || 0).toFixed(1)}
            </span>
            <span className="review-count">
              ({numOfReviews || 0} review{numOfReviews !== 1 ? "s" : ""})
            </span>
          </div>

          {price > 0 && (
            <div className="price-block">
              <span className="price-label">Price</span>
              <span className="price-value">{formatPrice(price)}</span>
            </div>
          )}

          <div className="cta-buttons">
            <button onClick={addToCart} className="btn-cart">
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={handleCreateReminder} className="btn-reminder">
              <FaBell /> Set Reminder
            </button>
          </div>

          {preparationSteps.length > 0 && (
            <div className="prep-meta">
              {preparationSteps[0]?.skillLevel && (
                <div className="prep-pill">
                  <FaFire className="pill-icon" />
                  <span>Skill: {preparationSteps[0].skillLevel}</span>
                </div>
              )}
              {totalSteps > 0 && (
                <div className="prep-pill">
                  <FaCheckCircle className="pill-icon" />
                  <span>{totalSteps} step{totalSteps !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          INGREDIENTS
      ═══════════════════════════════════════════════ */}
      <div className="content-block">
        <div className="block-header">
          <h2 className="block-title">Ingredients</h2>
          <span className="block-count">{ingredients.length} items</span>
        </div>
        {ingredients.length > 0 ? (
          <div className="ingredients-grid">
            {ingredients.map(
              ({ _id: iid, name: iName, quantity, unit, price: iPrice, substitutions = [] }) => (
                <div key={iid} className="ing-card">
                  <div className="ing-name">{iName}</div>
                  <div className="ing-qty">
                    {quantity} {unit}
                  </div>
                  {iPrice > 0 && (
                    <div className="ing-price">{formatPrice(iPrice)}</div>
                  )}
                  {substitutions.length > 0 && (
                    <div className="ing-sub">
                      Alt: {substitutions.map((s) => s.name).join(", ")}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <p className="empty-note">No ingredients listed.</p>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          PREPARATION STEPS
      ═══════════════════════════════════════════════ */}
      <div className="content-block">
        <div className="block-header">
          <h2 className="block-title">How to Prepare</h2>
          {totalSteps > 0 && (
            <span className="block-count">{totalSteps} steps</span>
          )}
        </div>
        {preparationSteps.length > 0 ? (
          preparationSteps.map(({ _id: pid, description, skillLevel, steps = [] }) => (
            <div key={pid} className="prep-guide">
              {description && (
                <p className="prep-description">{description}</p>
              )}
              {skillLevel && (
                <span className="skill-badge">{skillLevel}</span>
              )}
              {steps.length > 0 && (
                <div className="steps-list">
                  {steps.map(({ stepNumber, instruction, _id: sid }) => (
                    <div key={sid} className="step-item">
                      <span className="step-badge">{stepNumber}</span>
                      <p className="step-text">{instruction}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="empty-note">No preparation steps available.</p>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════ */}
      <div className="content-block">
        <div className="block-header">
          <h2 className="block-title">Reviews</h2>
          <span className="block-count">
            {numOfReviews || 0} review{numOfReviews !== 1 ? "s" : ""}
          </span>
        </div>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map(({ _id: rid, user: reviewer, title, comment, rating }) => (
              <div key={rid} className="review-card">
                <div className="review-top">
                  <div className="reviewer-avatar">
                    {(reviewer?.fullName?.[0] || "?").toUpperCase()}
                  </div>
                  <div>
                    <span className="reviewer-name">
                      {reviewer?.fullName || "Anonymous"}
                    </span>
                    <div className="review-stars">{renderStars(rating)}</div>
                  </div>
                </div>
                {title && <p className="review-title">{title}</p>}
                <p className="review-comment">{comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-note">
            No reviews yet. Be the first to review this meal!
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default SingleMeal;
