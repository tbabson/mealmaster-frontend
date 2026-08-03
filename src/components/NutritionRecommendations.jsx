import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/NutritionRecommendations";
import { GiHealthNormal } from "react-icons/gi";

const fmt = (n) =>
  typeof n === "number" ? (Number.isInteger(n) ? n : n.toFixed(1)) : "—";

/**
 * Presentational grid of nutrition-driven meal recommendations.
 *
 * Deliberately renders nothing when there is nothing worth showing, so it can be
 * dropped onto a page without adding an empty heading or an error box to a view
 * that is really about something else.
 */
const NutritionRecommendations = ({
  recommendations = [],
  summary,
  isLoading = false,
  title = "Recommended for you",
  subtitle,
  showSummary = true,
  showNote = true,
}) => {
  if (isLoading) {
    return (
      <Wrapper>
        <div className="nr-head">
          <h2>
            <GiHealthNormal /> {title}
          </h2>
        </div>
        <div className="nr-skeleton">
          <div />
          <div />
          <div />
        </div>
      </Wrapper>
    );
  }

  if (!recommendations.length) return null;

  return (
    <Wrapper>
      <div className="nr-head">
        <h2>
          <GiHealthNormal /> {title}
        </h2>
        {subtitle && <p className="nr-summary">{subtitle}</p>}
        {showSummary && summary && <p className="nr-summary">{summary}</p>}
      </div>

      <div className="nr-grid">
        {recommendations.map(({ meal, reason, addresses }) => (
          <article className="nr-card" key={meal._id}>
            {meal.image && (
              <img className="nr-img" src={meal.image} alt={meal.name} />
            )}
            <div className="nr-body">
              <h3 className="nr-name">{meal.name}</h3>
              <div className="nr-meta">
                {meal.mealType} · {meal.country}
              </div>
              <p className="nr-reason">{reason}</p>

              {addresses?.length > 0 && (
                <div className="nr-tags">
                  {addresses.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              )}

              <div className="nr-macros">
                <span>
                  <b>{fmt(meal.nutrition?.calories)}</b> kcal
                </span>
                <span>
                  <b>{fmt(meal.nutrition?.protein)}</b>g protein
                </span>
                <span>
                  <b>{fmt(meal.nutrition?.fiber)}</b>g fibre
                </span>
              </div>

              <Link className="nr-link" to={`/meals/${meal._id}`}>
                View meal →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {showNote && (
        <p className="nr-note">
          Suggested from the nutritional profile of meals you&apos;ve ordered.
          Estimates only — not medical advice.
        </p>
      )}
    </Wrapper>
  );
};

NutritionRecommendations.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      meal: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        mealType: PropTypes.string,
        country: PropTypes.string,
        nutrition: PropTypes.object,
      }),
      reason: PropTypes.string,
      addresses: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  summary: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showSummary: PropTypes.bool,
  showNote: PropTypes.bool,
};

export default NutritionRecommendations;
