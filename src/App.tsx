import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Home from "./features/ui/Home";
import Error from "./features/ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./features/ui/AppLayout";
import { Provider } from "react-redux";
import store from "./store";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={appRouter}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
