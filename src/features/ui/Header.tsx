import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import Username from "../user/Username";

function Header() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-stone-300 bg-yellow-500 p-3 uppercase sm:p-5 md:p-4 relative">
        <Link to="/" className="tracking-widest">
          Fast React Pizza Co.
        </Link>
        <span className="flex items-center justify-center space-x-3">
          <SearchOrder />
          <Username />
        </span>
      </header>
    </>
  );
}

export default Header;
