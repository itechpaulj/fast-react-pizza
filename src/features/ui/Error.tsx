import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  //@ts-expect-error destructuring object
  const { data, message } = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{data || message}</p>
      <button
        className="text-blue-700 hover:text-blue-400 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
