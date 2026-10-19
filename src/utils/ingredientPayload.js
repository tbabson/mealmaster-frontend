// Ingredient form rows hold strings ("" for an empty input). The API treats a
// present field as a real value — "" for price would fail validation — so send
// typed numbers and check them before any request goes out.

const isNumberInput = (value) => value !== "" && value !== null && value !== undefined && !Number.isNaN(Number(value));

// Returns an error message for the first invalid row, or null when all are valid.
export const validateIngredients = (ingredients) => {
  for (const ing of ingredients) {
    const label = ing.name?.trim() || "an ingredient";
    if (!isNumberInput(ing.price) || Number(ing.price) < 0) return `Enter a price for ${label}`;
    if (!isNumberInput(ing.quantity) || Number(ing.quantity) <= 0) return `Enter a quantity for ${label}`;
    if (!ing.unit?.trim()) return `Enter a unit for ${label}`;
  }
  return null;
};

export const toIngredientPayload = (ing, mealId) => ({
  name: ing.name.trim(),
  quantity: Number(ing.quantity),
  unit: ing.unit.trim(),
  price: Number(ing.price),
  substitutions: (ing.substitutions || [])
    .filter((s) => s.name?.trim())
    .map((s) => ({
      name: s.name.trim(),
      unit: s.unit?.trim() || undefined,
      quantity: isNumberInput(s.quantity) ? Number(s.quantity) : undefined,
    })),
  meal: mealId,
});
