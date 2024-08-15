import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SearchOrder extends HTMLFormControlsCollection {
  searchOrder: HTMLInputElement;
}

interface FormSearch extends HTMLFormElement {
  readonly elements: SearchOrder;
}

function SearchOrder() {
  const [query, setQuery] = useState<string>("");
  const navigation = useNavigate();

  function handleSubmit(e: FormEvent<FormSearch>) {
    e.preventDefault();
    const target = e.currentTarget.elements;
    if (!query) return;

    const searchQuery = target.searchOrder.value;
    navigation(`/order/${searchQuery}`);
    setQuery("");
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <input
          id="searchOrder"
          placeholder="Search order #"
          value={query}
          className="text-md rounded-full px-4 py-2 transition-all duration-300 placeholder:text-stone-500 focus:w-full sm:text-sm md:focus:w-72 "
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </>
  );
}

export default SearchOrder;
