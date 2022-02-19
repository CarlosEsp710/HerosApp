import React from "react";

import { HeroList } from "../hero/HeroList";

export const MarvelScreen = () => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Marvel Screen</h1>
        </div>
      </header>
      <div className="container">
        <HeroList publisher="Marvel Comics" />
      </div>
    </>
  );
};
