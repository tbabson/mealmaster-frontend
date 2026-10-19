import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch";

// Stable reference while loading, so effects that depend on `meals` don't re-run every render
const NO_MEALS = [];

// The newest meals, shared by every landing section that shows food photos.
// Each meal gets `cover` (its image) and `price` (sum of its ingredients).
const useLandingMeals = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landingMeals"],
    queryFn: async () => {
      const { data } = await customFetch.get("/meals?limit=8&sort=newest");
      return (data.meals || []).map((meal) => ({
        ...meal,
        cover: meal.image || meal.images?.[0] || null,
        price: (meal.ingredients || []).reduce(
          (sum, ing) => sum + (ing.price || 0) * (ing.quantity || 0),
          0
        ),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });

  return { meals: data || NO_MEALS, isLoading };
};

export default useLandingMeals;
