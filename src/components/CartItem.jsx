import { formatPrice } from "../utils/formatPrice";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  updateIngredientQuantity,
  removeMeal,
} from "../Features/Cart/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import Wrapper from "../assets/wrappers/CartItem";

const CartItem = ({ meal }) => {
  const dispatch = useDispatch();

  if (!meal) return null;

  const { mealID, name, ingredients, image } = meal;

  const removeIngredientHandler = (ingredient) => {
    dispatch(removeIngredient({ mealID, ingredientName: ingredient.name }));
  };

  const editIngredientHandler = (ingredient, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeIngredient({ mealID, ingredientName: ingredient.name }));
      return;
    }
    dispatch(updateIngredientQuantity({ mealID, ingredientName: ingredient.name, newQuantity }));
  };

  const removeMealHandler = () => {
    dispatch(removeMeal({ mealID }));
  };

  const mealTotal = ingredients.reduce(
    (total, ing) => total + ing.price * ing.quantity,
    0
  );

  return (
    <Wrapper>
      <div className="cart-item">
        <div className="meal-image">
          <img src={image} alt={name} />
        </div>

        <div className="meal-body">
          <div className="meal-header">
            <h3 className="meal-name">{name}</h3>
            <button
              className="remove-meal-btn"
              onClick={removeMealHandler}
              aria-label="Remove meal"
              title="Remove meal"
            >
              <MdDeleteOutline />
            </button>
          </div>

          <ul className="ingredient-list">
            {ingredients.map((ingredient) => (
              <li key={ingredient._id || ingredient.name} className="ingredient-row">
                <span className="ing-name">
                  {ingredient.name}
                  <span className="ing-unit"> ({ingredient.unit || "pcs"})</span>
                </span>
                <span className="ing-price">{formatPrice(ingredient.price)}</span>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => editIngredientHandler(ingredient, ingredient.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span className="qty-value">{ingredient.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => editIngredientHandler(ingredient, ingredient.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                  <button
                    className="remove-ing-btn"
                    onClick={() => removeIngredientHandler(ingredient)}
                    aria-label="Remove ingredient"
                    title="Remove ingredient"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="meal-footer">
            <span className="meal-total">{formatPrice(mealTotal)}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
