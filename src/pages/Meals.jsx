import { MealContainer, SearchContainer, PageHeader } from "../components";
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
        <PageHeader
          eyebrow="Dishes to explore"
          title="A menu that begins with the eyes."
          subtitle={
            totalMeals !== null
              ? `${totalMeals} recipe${totalMeals !== 1 ? "s" : ""} from around the world. Filter by type, diet or origin to find yours.`
              : "Recipes from around the world. Filter by type, diet or origin to find yours."
          }
        />

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
