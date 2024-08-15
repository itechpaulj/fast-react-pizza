import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <>
      <div className={`px-2 py-3`}>
        <p className="font-semibold flex justify-center items-center ms-auto">
          Your cart is still empty. Start adding some pizzas :)
        </p>
        <Link
          to="/menu"
          className="text-blue-700 hover:text-blue-400 hover:underline float-start"
        >
          &larr; Back to menu
        </Link>
      </div>
    </>
  );
}

export default EmptyCart;
