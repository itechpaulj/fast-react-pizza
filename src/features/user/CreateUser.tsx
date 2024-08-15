import { FormEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

interface ElemUser extends HTMLFormControlsCollection {
  userName: HTMLInputElement;
}

interface SubmitUsername extends HTMLFormElement {
  readonly elements: ElemUser;
}

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleSubmit(e: FormEvent<SubmitUsername>) {
    e.preventDefault();

    const target = e.currentTarget.elements;

    const username = target.userName.value;

    if (!username) return;

    dispatch(updateName(username));
    navigation("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-0 sm:mx-32 md:32">
        <p className="md:mb4 mb-3 sm:mb-5">
          👋 Welcome! Please start by telling us your name:
        </p>

        <input
          className="cursor:text-center w-full rounded-full border border-stone-300 px-4 py-2 text-center transition-all duration-75 placeholder:text-center placeholder:text-stone-300"
          type="text"
          placeholder="Your full name"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {username !== "" && (
        <div>
          <button className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
