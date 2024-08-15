import { useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import { useSelector } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/CreateSlice";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const cart = useSelector(
    (state: {
      cart: {
        cart: [];
      };
    }) => state.cart.cart
  );

  type HAS_USER = {
    user: {
      username: string;
      loading: "idle" | "loading" | "error";
      position: {
        latitude: number | null;
        longitude: number | null;
      };
      address: string;
      error: string;
    };
  };

  const { username, loading, position, address, error } = useSelector(
    (state: HAS_USER) => state.user
  );

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formsError = useActionData();
  const getTotalPrice = useSelector(
    (state: {
      cart: {
        cart: [];
      };
    }) => {
      return state.cart.cart.reduce(
        (acc: number, curr: { totalPrice: number }) => {
          return acc + curr.totalPrice;
        },
        0
      );
    }
  );

  const priority = withPriority ? +getTotalPrice * 0.2 : +getTotalPrice * 0;
  const totalPrice = getTotalPrice + priority;

  //@ts-expect-error error phone
  const isPhoneError = formsError?.phone && formsError.phone;

  const isError = loading === "error";

  if (!cart.length) return <EmptyCart />;

  function handlerGeolocation() {
    //@ts-expect-error unknown type
    dispatch(fetchAddress());
  }

  return (
    <div className="h-screen">
      <h2 className="mb-4 text-2xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="sm:item-center my-2 w-full flex-col gap-2 sm:flex sm:flex-row">
          <label className="basis-40 text-nowrap">First Name</label>
          <input
            className="ms-0 w-full rounded-full border border-stone-300 px-4 py-2 transition-all duration-75 placeholder:text-stone-300 sm:ms-13 md:ms-8 lg:ms-6 xl:ms-4"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="sm:item-center my-2 w-full flex-col gap-2 sm:flex sm:flex-row">
          <label className="basis-40 text-nowrap">Phone number</label>
          <div className="grow">
            <input
              className="w-full rounded-full border border-stone-300 px-4 py-2 transition-all duration-75 placeholder:text-stone-300"
              type="tel"
              name="phone"
              required
            />
            {isPhoneError && (
              <p className="ml-1 mt-2 rounded-md bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-500">
                {isPhoneError}
              </p>
            )}
          </div>
        </div>

        <div className="sm:item-center my-2 w-full flex-col gap-2 sm:flex sm:flex-row relative">
          <label className="basis-40 text-nowrap">Address</label>
          <div className="grow">
            <input
              className="w-full rounded-full border border-stone-300 px-4 py-2 transition-all duration-75 placeholder:text-stone-300"
              type="text"
              name="address"
              defaultValue={address !== "" ? address.replace("(the)", "") : ""}
              required
            />
            {isError && (
              <p className="ml-1 mt-2 rounded-md bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-500">
                {error}
              </p>
            )}
          </div>

          {address === "" && (
            <span className="absolute right-1 bottom-[5px] top-[-3px]">
              <button
                className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-1 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
                onClick={(e) => {
                  e.preventDefault();
                  handlerGeolocation();
                }}
              >
                Get Position
              </button>
            </span>
          )}
        </div>

        <div className="ms-1 mt-5 flex space-x-2">
          <input
            className="h-6 w-6 accent-yellow-600"
            type="checkbox"
            name="priority"
            id="priority"
            value={`${withPriority}`}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <div className="mt-3">
          <button
            className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processing Order ..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const response = await request.formData();
  const data = Object.fromEntries(response);
  const order = {
    ...data,
    cart: JSON.parse(`${data.cart}`),
    priority: data.priority === "true" ? true : false,
  };

  const errors = {};
  if (!isValidPhone(`${data.phone}`)) {
    //@ts-expect-error add new object properties
    errors.phone = `Please input a valid phone number. We might need contact you.`;
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  //@ts-expect-error clear the all cart
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
