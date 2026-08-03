import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Nutrition";
import { Loading, NutritionRecommendations } from "../components";
import { GiHealthNormal } from "react-icons/gi";
import { FiPieChart, FiTrendingUp, FiCompass } from "react-icons/fi";

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
  const currentUser = useSelector((state) => state.user?.user);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
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
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Wrapper>
        <div className="guest-screen">
          <div className="guest-card">
            <div className="guest-avatar">
              <GiHealthNormal />
            </div>
            <h1 className="guest-title">Know What You&apos;re Eating</h1>
            <p className="guest-sub">
              Sign in to see the nutrition behind every meal you order, spot
              patterns in your diet, and get suggestions that balance it out.
            </p>

            <div className="guest-features">
              <div className="feature-item">
                <span className="feature-icon facts-icon">
                  <FiPieChart />
                </span>
                <div>
                  <p className="feature-label">Nutrition Per Meal</p>
                  <p className="feature-desc">
                    Calories, protein, carbs, fat, fibre and sodium for every dish
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon profile-icon">
                  <FiTrendingUp />
                </span>
                <div>
                  <p className="feature-label">Your Eating Pattern</p>
                  <p className="feature-desc">
                    Your average meal measured against general reference values
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon suggest-icon">
                  <FiCompass />
                </span>
                <div>
                  <p className="feature-label">Balanced Suggestions</p>
                  <p className="feature-desc">
                    Meals picked to fill the gaps your order history reveals
                  </p>
                </div>
              </div>
            </div>

            <div className="guest-actions">
              <Link to="/login" className="btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn-register">
                Create Account
              </Link>
            </div>

            <p className="guest-footer-text">
              New here?{" "}
              <Link to="/register" className="inline-link">
                Create a free account
              </Link>{" "}
              and start tracking today.
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

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

          {data.recommendations?.length ? (
            <NutritionRecommendations
              recommendations={data.recommendations}
              showNote={false}
            />
          ) : (
            <div className="panel">
              <h2>Recommended for you</h2>
              <p className="summary">
                No recommendations available yet — we need more meals with
                nutrition information to compare against.
              </p>
            </div>
          )}
        </>
      )}

      {data?.disclaimer && <p className="disclaimer">{data.disclaimer}</p>}
    </Wrapper>
  );
};

export default Nutrition;
