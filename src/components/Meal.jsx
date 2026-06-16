import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Meal";
import { FaStar, FaLeaf, FaUtensils } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";

const Meal = ({ _id, image, name, mealType, country, dietary, ingredients = [], averageRating = 0, numOfRatings = 0 }) => {
  const price = (ingredients || []).reduce(
    (sum, ing) => sum + (ing.price || 0) * (ing.quantity || 0),
    0
  );

  const dietaryArr = Array.isArray(dietary)
    ? dietary.filter(Boolean)
    : [dietary].filter(Boolean);

  const displayDietary = dietaryArr.find((d) => d !== "none") || null;

  return (
    <Wrapper>
      <Link to={`/meals/${_id}`} className="meal-card">
        <div className="card-image">
          <img src={image} alt={name} loading="lazy" />
          <span className="type-badge">{mealType}</span>
          {averageRating > 0 && (
            <span className="rating-badge">
              <FaStar className="star-icon" />
              {averageRating.toFixed(1)}
            </span>
          )}
          <div className="card-overlay">
            <span className="view-recipe">View Recipe</span>
          </div>
        </div>

        <div className="card-body">
          <h3 className="meal-name">{name}</h3>
          <div className="card-meta">
            <span className="meta-country">
              <FaUtensils className="meta-icon" />
              {country}
            </span>
            {displayDietary && (
              <span className="dietary-chip">
                <FaLeaf className="leaf-icon" />
                {displayDietary}
              </span>
            )}
          </div>
          {price > 0 && (
            <div className="card-price">{formatPrice(price)}</div>
          )}
        </div>
      </Link>
    </Wrapper>
  );
};

export default Meal;
