import { Meal, PageBtnContainer, Loading } from ".";
import { useAllMealsContext } from "../pages/Meals";
import Wrapper from "../assets/wrappers/MealContainer";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";

const MealContainer = () => {
  const { data } = useAllMealsContext();

  if (!data) {
    return <Loading />;
  }

  const { meals, totalMeals, numOfPages } = data;

  if (meals.length === 0) {
    return (
      <Wrapper>
        <div className="empty-state">
          <GiHotMeal className="empty-icon" />
          <h3>No meals found</h3>
          <p>Try adjusting your filters to find what you're looking for.</p>
          <Link to="/meals" className="clear-btn">Clear Filters</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="result-header">
        <span className="result-count">
          {totalMeals} meal{totalMeals !== 1 ? "s" : ""} found
        </span>
      </div>
      <div className="meals-grid">
        {meals.map((meal) => (
          <Meal key={meal._id} {...meal} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default MealContainer;
