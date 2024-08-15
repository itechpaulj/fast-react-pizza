import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <Loader />}

      <Header />

      <main className="mx-auto my-5 p-0 px-5">
        <Outlet />
      </main>

      <CartOverview />
    </>
  );
}

export default AppLayout;
