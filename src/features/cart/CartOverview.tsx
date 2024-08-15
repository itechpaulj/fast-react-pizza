import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(
    (state: {
      cart: {
        cart: [];
      };
    }) => {
      if (state.cart.cart instanceof Array) {
        return state.cart.cart.reduce(
          (acc, curr: { quantity: number }) => acc + curr.quantity,
          0
        );
      }
      return 0;
    }
  );

  const totalPrice = useSelector(
    (state: {
      cart: {
        cart: [];
      };
    }) =>
      state.cart.cart.reduce(
        (
          acc: number,
          curr: {
            totalPrice: number;
          }
        ) => acc + curr.totalPrice,
        0
      )
  );

  return (
    <div className={`${totalQuantity === 0 ? "hidden" : ""}`}>
      <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-white">
        <p className="space-x-3 font-semibold text-stone-100 sm:space-x-6 md:space-x-4">
          <span>{totalQuantity} pizza(s)</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
