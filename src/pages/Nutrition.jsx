import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Nutrition";
import { Loading } from "../components";
import { GiHealthNormal } from "react-icons/gi";

const NUTRIENTS = [
  { key: "calories", label: "Calories", unit: "kcal" },
  { key: "protein", label: "Protein", unit: "g" },
  { key: "carbohydrates", label: "Carbs", unit: "g" },
  { key: "fat", label: "Fat", unit: "g" },
  { key: "fiber", label: "Fibre", unit: "g" },
  { key: "sugar", label: "Sugar", unit: "g" },
  { key: "sodium", label: "Sodium", unit: "mg" },
];

const fmt = (n) =>
  typeof n === "number" ? (Number.isInteger(n) ? n : n.toFixed(1)) : "—";

const Nutrition = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.user) {
      navigate("/login", { state: { from: "/nutrition" } });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { data } = await customFetch.get("/nutrition/recommendations");
        if (!cancelled) setData(data);
      } catch (err) {
        if (cancelled) return;
        // The backend maps OpenAI billing/key/quota problems to real status
        // codes with a readable message — surface that rather than "failed".
        setError(
          err?.response?.data?.message ||
            "We couldn't load your nutrition insights right now."
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, navigate]);

  if (isLoading) return <Loading />;

  const profile = data?.profile;
  const gapByNutrient = Object.fromEntries(
    (profile?.gaps || []).map((g) => [g.nutrient, g])
  );

  return (
    <Wrapper>
      <div className="page-head">
        <h1>
          <GiHealthNormal /> Your nutrition
        </h1>
        <p>
          Built from the meals you&apos;ve actually ordered. We compare your
          average meal against general reference values and suggest dishes that
          balance it out.
        </p>
      </div>

      {error && <div className="notice">{error}</div>}

      {/* No orders yet */}
      {!error && profile && !profile.hasHistory && (
        <div className="panel state">
          <h2>No orders yet</h2>
          <p>
            Once you&apos;ve ordered a few meals we can show you what your diet
            looks like and recommend dishes that fill the gaps.
          </p>
          <Link to="/meals">Browse meals</Link>
        </div>
      )}

      {/* Ordered, but the meals have no nutrition data generated yet */}
      {!error && profile?.hasHistory && !profile.averagePerMeal && (
        <div className="panel state">
          <h2>Nutrition data is still being prepared</h2>
          <p>
            You&apos;ve ordered {profile.distinctMealsOrdered}{" "}
            {profile.distinctMealsOrdered === 1 ? "meal" : "different meals"}{" "}
            across {profile.ordersAnalysed}{" "}
            {profile.ordersAnalysed === 1 ? "order" : "orders"}, but none of them
            have nutrition information yet. Check back soon.
          </p>
          <Link to="/meals">Browse meals</Link>
        </div>
      )}

      {/* Full profile */}
      {!error && profile?.averagePerMeal && (
        <>
          <div className="panel">
            <h2>Your average meal</h2>
            {data.summary && <p className="summary">{data.summary}</p>}

            <div className="stat-row">
              <div className="stat">
                <span className="k">Orders analysed</span>
                <span className="v">{profile.ordersAnalysed}</span>
              </div>
              <div className="stat">
                <span className="k">Different meals</span>
                <span className="v">{profile.distinctMealsOrdered}</span>
              </div>
              <div className="stat">
                <span className="k">With nutrition data</span>
                <span className="v">{profile.mealsWithNutrition}</span>
              </div>
            </div>

            <div className="bars">
              {NUTRIENTS.map(({ key, label, unit }) => {
                const actual = profile.averagePerMeal[key] ?? 0;
                const reference = profile.referencePerMeal?.[key] ?? 0;
                const pct = reference
                  ? Math.min((actual / reference) * 100, 100)
                  : 0;
                const gap = gapByNutrient[key];
                return (
                  <div className="bar-row" key={key}>
                    <span className="bar-label">{label}</span>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${gap ? gap.direction : ""}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="bar-value">
                      {fmt(actual)} / {fmt(reference)} {unit}
                    </span>
                  </div>
                );
              })}
            </div>

            {profile.gaps.length > 0 && (
              <div className="gaps">
                {profile.gaps.map((g) => (
                  <span className={`gap-chip ${g.direction}`} key={g.nutrient}>
                    {g.label} · {g.percentOfReference}% of reference
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <h2>Recommended for you</h2>
            {data.recommendations?.length ? (
              <div className="recs">
                {data.recommendations.map(({ meal, reason, addresses }) => (
                  <article className="rec-card" key={meal._id}>
                    {meal.image && (
                      <img className="rec-img" src={meal.image} alt={meal.name} />
                    )}
                    <div className="rec-body">
                      <h3 className="rec-name">{meal.name}</h3>
                      <div className="rec-meta">
                        {meal.mealType} · {meal.country}
                      </div>
                      <p className="rec-reason">{reason}</p>
                      {addresses?.length > 0 && (
                        <div className="rec-addresses">
                          {addresses.map((a) => (
                            <span key={a}>{a}</span>
                          ))}
                        </div>
                      )}
                      <div className="rec-macros">
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
                      <Link className="rec-link" to={`/meals/${meal._id}`}>
                        View meal →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="summary">
                No recommendations available yet — we need more meals with
                nutrition information to compare against.
              </p>
            )}
          </div>
        </>
      )}

      {data?.disclaimer && <p className="disclaimer">{data.disclaimer}</p>}
    </Wrapper>
  );
};

export default Nutrition;
