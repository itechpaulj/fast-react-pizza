import { formatCurrency } from "../utils/helpers";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  descreaseItemQuantity,
  increaseItemQuantity,
} from "./CreateSlice";

type HAS_CART_ITEM = {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
  };
};
function CartItem({ item }: HAS_CART_ITEM) {
  //@ts-expect-error pizzaId empty
  const { pizzaId, name, quantity, totalPrice }: HAS_CART_ITEM = item;

  const dispatch = useDispatch();

  function handleDeleteItem(pizzaId: number) {
    dispatch(deleteItem(pizzaId));
  }

  function handleIncreaseCartQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseCartQuantity() {
    dispatch(descreaseItemQuantity(pizzaId));
  }
  return (
    <li>
      <div className="w-full bg-stone-100/20">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="my-2 flex items-center justify-end space-x-3 text-xs font-medium">
          <p>{formatCurrency(totalPrice)}</p>
          <button
            className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-2 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
            onClick={() => handleDecreaseCartQuantity()}
          >
            -
          </button>
          <span className="text-sm font-medium mt-1">{quantity}</span>
          <button
            className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-2 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
            onClick={() => handleIncreaseCartQuantity()}
          >
            +
          </button>

          <button
            className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-2 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
            onClick={() => handleDeleteItem(pizzaId)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
