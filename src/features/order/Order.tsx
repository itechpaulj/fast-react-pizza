// Test ID: IIDSAT
import { useEffect } from "react";
import {
  ActionFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

export type CART_ITEM = {
  addIngredients: [];
  removeIngredients: [];
  pizzaId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export type Has_Order = {
  id: string;
  status: string;
  priority: string;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CART_ITEM[];
};

type HAS_FETCHER = {
  id: number;
  imageUrl: string;
  ingredients: [];
  name: string;
  soldOut: boolean;
  unitPrice: number;
};
function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  //@ts-expect-error unknown object
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  }: Has_Order = order;

  // note: useFetcher get access in the other route
  // fetcher is OrderItem.tsx include get the ingredient
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (fetcher.state === "idle" && !fetcher.data) {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );
  const isLoadingIngredients = fetcher.state === "loading";

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-0 h-screen space-y-5">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="text-widest rounded-full bg-red-500 px-2 py-1 text-xs font-semibold uppercase text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="m-1 rounded-md bg-stone-300 px-3 py-3">
        <p className="text-md font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm font-medium text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="m-2">
        <ul className="divide-y border-b border-t">
          {cart instanceof Array &&
            cart.map((item) => (
              <OrderItem
                item={item}
                key={item.pizzaId}
                isLoadingIngredients={isLoadingIngredients}
                ingredients={
                  fetcher?.data?.find(
                    (el: HAS_FETCHER) => +el.id === +item.pizzaId
                  ).ingredients ?? []
                }
              />
            ))}
        </ul>
      </div>

      <div className="m-1 rounded-md bg-stone-300 px-3 py-3">
        <p className="text-sm font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-md font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <div className="flex items-end justify-end">
          <UpdateOrder priority={priority} />
        </div>
      )}
    </div>
  );
}

export async function loader({ params }: ActionFunctionArgs) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
