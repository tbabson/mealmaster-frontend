import { MealContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { allMealsQuery } from "../actionsAndLoaders/MealsLoader";
import Wrapper from "../assets/wrappers/MealsPage";

const AllMealsContext = createContext();

const Meals = () => {
  const { searchValues } = useLoaderData();
  const query = allMealsQuery(searchValues);
  const { data } = useQuery(query);

  const totalMeals = data?.totalMeals ?? null;

  return (
    <AllMealsContext.Provider value={{ data, searchValues }}>
      <Wrapper>
        <div className="page-hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h1>Explore Our Meals</h1>
              <p>
                {totalMeals !== null
                  ? `${totalMeals} recipe${totalMeals !== 1 ? "s" : ""} from around the world`
                  : "Hundreds of recipes from around the world"}
              </p>
            </div>
          </div>
        </div>

        <div className="meals-layout">
          <SearchContainer />
          <MealContainer />
        </div>
      </Wrapper>
    </AllMealsContext.Provider>
  );
};

export const useAllMealsContext = () => useContext(AllMealsContext);
export default Meals;
