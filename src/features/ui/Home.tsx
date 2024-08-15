import CreateUser from "../user/CreateUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type IS_USER = {
  user: {
    username: string;
  };
};

function Home() {
  const username = useSelector((state: IS_USER) => state.user.username);

  return (
    <>
      <div className="my-5 h-screen p-0 text-center">
        <h1 className="mx-auto mb-1 grid grid-rows-3 text-xl font-semibold sm:text-4xl md:text-4xl">
          The best pizza.
          <br />
          <span className="text-yellow-500">
            Straight out of the oven, straight to you.
          </span>
        </h1>
        {username !== "" ? (
          <Link
            to="/menu"
            className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300"
          >
            Continue Ordering ...
          </Link>
        ) : (
          <CreateUser />
        )}
      </div>
    </>
  );
}

export default Home;
