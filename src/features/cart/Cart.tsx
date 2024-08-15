import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./CreateSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector(
    (state: {
      user: {
        username: string;
      };
    }) => state.user.username
  );

  const cart = useSelector(
    (state: {
      cart: {
        cart: [];
      };
    }) => state.cart.cart
  );

  const dispatch = useDispatch();

  function handleClearCart() {
    //@ts-expect-error clear the cart
    dispatch(clearCart());
  }

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="h-screen">
      <Link
        to="/menu"
        className="text-blue-700 hover:text-blue-400 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-6 text-3xl font-semibold">
        Your cart, <span className="uppercase">{username}</span>
      </h2>

      <ul className="my-5 divide-y divide-stone-200 border-b-2 border-t-2 py-2">
        {cart instanceof Array &&
          cart.map((item, key) => (
            <CartItem item={item} key={`${key + 1} - ${crypto.randomUUID}`} />
          ))}
      </ul>

      <div className="mb-20 mt-4">
        <Link
          className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
          to="/order/new"
        >
          Order pizzas
        </Link>
        <button
          className="ms-3 mt-2 inline-block rounded-full border-2 px-3 py-3 font-semibold tracking-wide text-stone-800 transition-all duration-300 hover:bg-stone-300"
          onClick={handleClearCart}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
