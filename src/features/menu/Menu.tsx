import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData(); // connected to loader properties in the APP.tsx

  return (
    <>
      <ul className="divide-y bg-stone-200/10">
        {menu instanceof Array &&
          menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} />)}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
