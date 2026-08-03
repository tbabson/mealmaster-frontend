import PropTypes from "prop-types";
import Wrapper from "../assets/wrappers/NutritionFacts";
import { GiHealthNormal } from "react-icons/gi";

const MACROS = [
  { key: "protein", label: "Protein", unit: "g" },
  { key: "carbohydrates", label: "Carbs", unit: "g" },
  { key: "fat", label: "Fat", unit: "g" },
  { key: "fiber", label: "Fibre", unit: "g" },
  { key: "sugar", label: "Sugar", unit: "g" },
  { key: "sodium", label: "Sodium", unit: "mg" },
];

const fmt = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? Number.isInteger(n)
      ? n
      : n.toFixed(1)
    : "—";

/**
 * Per-serving nutrition for a meal. Renders a quiet empty state when the meal
 * has not had nutrition generated yet, so it is safe to drop in unconditionally.
 */
const NutritionFacts = ({ nutrition }) => {
  const hasData = nutrition && nutrition.calories != null;

  return (
    <Wrapper>
      <div className="nf-head">
        <h3 className="nf-title">
          <GiHealthNormal /> Nutrition
        </h3>
        {hasData && (
          <span className="nf-serving">
            Per serving
            {nutrition.servings > 1 ? ` · makes ${nutrition.servings}` : ""}
          </span>
        )}
      </div>

      {!hasData ? (
        <p className="nf-empty">
          Nutrition information hasn&apos;t been calculated for this meal yet.
        </p>
      ) : (
        <>
          <div className="nf-calories">
            <span className="val">{fmt(nutrition.calories)}</span>
            <span className="unit">kcal</span>
            <span className="lbl">per serving</span>
          </div>

          <div className="nf-grid">
            {MACROS.map(({ key, label, unit }) => (
              <div className="nf-cell" key={key}>
                <span className="k">{label}</span>
                <span className="v">
                  {fmt(nutrition[key])}
                  {nutrition[key] != null && (
                    <small style={{ fontWeight: 600, opacity: 0.6 }}> {unit}</small>
                  )}
                </span>
              </div>
            ))}
          </div>

          {Array.isArray(nutrition.highlights) && nutrition.highlights.length > 0 && (
            <div className="nf-highlights">
              {nutrition.highlights.map((h) => (
                <span className="nf-chip" key={h}>
                  {h}
                </span>
              ))}
            </div>
          )}

          {nutrition.caveats ? (
            <p className="nf-note caveat">{nutrition.caveats}</p>
          ) : null}

          <p className="nf-note">
            Estimated from the ingredient list — for general guidance only, not a
            laboratory analysis and not medical advice.
          </p>
        </>
      )}
    </Wrapper>
  );
};

NutritionFacts.propTypes = {
  // Null/undefined until an admin has generated nutrition for the meal.
  nutrition: PropTypes.shape({
    servings: PropTypes.number,
    calories: PropTypes.number,
    protein: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    fiber: PropTypes.number,
    sugar: PropTypes.number,
    sodium: PropTypes.number,
    highlights: PropTypes.arrayOf(PropTypes.string),
    caveats: PropTypes.string,
  }),
};

export default NutritionFacts;
