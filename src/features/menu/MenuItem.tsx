import { formatCurrency } from "../utils/helpers";
import { useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  descreaseItemQuantity,
  increaseItemQuantity,
} from "../cart/CreateSlice";
import { useSelector } from "react-redux";
type MENU = {
  pizza: {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
  };
};

type ADD_CART = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

function MenuItem({ pizza }: MENU) {
  const {
    id: pizzaId,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;

  const dispatch = useDispatch();

  function handleMenuAddToCart() {
    const addCart: ADD_CART = {
      pizzaId,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(addCart));
  }

  function handleDeleteItem(pizzaId: number) {
    dispatch(deleteItem(pizzaId));
  }

  const getToQuantityCart = (id: number) =>
    useSelector(
      (state: {
        cart: {
          cart: ADD_CART[];
        };
      }) => {
        return state.cart.cart.find((item: ADD_CART) => {
          return item.pizzaId === id;
        });
      }
    );

  const isInCart = getToQuantityCart(pizzaId)?.pizzaId === pizzaId;

  const getQuantity = getToQuantityCart(pizzaId)?.quantity ?? 0;

  function handleIncreaseCartQuantity(pizzaId: number) {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseCartQuantity(pizzaId: number) {
    dispatch(descreaseItemQuantity(pizzaId));
  }
  return (
    <li className="item-center flex border-stone-200 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={soldOut ? "h-24 grayscale" : "h-24"}
      />
      <div className="mx-2 w-full">
        <p className="font-bold">{name}</p>
        <p className="font-medium capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-start justify-between text-sm">
          {!soldOut ? (
            <p className="font-medium">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <>
              <div className="flex item-center justify-center gap-2">
                <button
                  className="ms-auto mt-0 inline-block rounded-full bg-yellow-400 px-2 py-2 text-sm font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-600"
                  onClick={() => handleDecreaseCartQuantity(pizzaId)}
                >
                  -
                </button>
                <span className="text-sm font-medium mt-2">{getQuantity}</span>
                <button
                  className="ms-auto mt-0 inline-block rounded-full bg-yellow-400 px-2 py-2 text-sm font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-600"
                  onClick={() => handleIncreaseCartQuantity(pizzaId)}
                >
                  +
                </button>
                <button
                  className="ms-auto mt-0 inline-block rounded-full bg-yellow-400 px-2 py-2 text-sm font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-600"
                  onClick={() => handleDeleteItem(pizzaId)}
                >
                  Delete Cart
                </button>
              </div>
            </>
          )}

          {!soldOut && !isInCart && (
            <button
              className="float-end ms-auto mt-0 inline-block rounded-full bg-yellow-400 px-2 py-2 text-sm font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-600"
              onClick={handleMenuAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
