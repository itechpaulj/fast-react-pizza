import { useSelector } from "react-redux";

type USERNAME = {
  user: {
    username: string;
  };
};

function Username() {
  const username = useSelector((state: USERNAME) => {
    return state.user.username;
  });

  if (!username) return null;

  return (
    <>
      <div className="hidden text-sm font-semibold md:block">{username}</div>
    </>
  );
}

export default Username;
