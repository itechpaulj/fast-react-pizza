import { formatCurrency } from "../utils/helpers";

type ITEM = {
  item: {
    quantity: number;
    name: string;
    totalPrice: number;
  };
  isLoadingIngredients: boolean;
  ingredients: [];
};

function OrderItem({ item, isLoadingIngredients, ingredients }: ITEM) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between">
        <p className="text-stone-700">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold text-stone-700">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm italic text-stone-500 font-medium capitalize">
        {isLoadingIngredients ? "Loading ..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
