import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { getHerosByName } from "../../selectors/getHerosByName";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const [form, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = form;

  const herosFilter = useMemo(() => getHerosByName(q), [q]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Screen</h1>
        </div>
      </header>
      <div className="container grid grid-cols-2">
        <form onSubmit={handleSearch}>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="text"
            name="searchText"
            complete="off"
            placeholder="Search..."
            value={searchText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mt-5 w-full bg-transparent hover:bg-sky-300 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded"
          >
            Search
          </button>
        </form>
        <div className="ml-4">
          <h4 className="text-xl mb-4">Results</h4>
          {q === "" ? (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Holy smokes!</strong>
              <span class="block sm:inline"> Search a hero.</span>
            </div>
          ) : (
            herosFilter.length === 0 && (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Holy smokes!</strong>
                <span class="block sm:inline"> No results for '{q}'.</span>
              </div>
            )
          )}
          {herosFilter.map((hero) => (
            <HeroCard className="mb-4" key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </>
  );
};
