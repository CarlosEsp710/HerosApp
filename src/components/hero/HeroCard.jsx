import React from "react";
import { Link } from "react-router-dom";

import { heroImages } from "../../helpers/heroImages";

export const HeroCard = ({ hero }) => {
  return (
    <Link to={`/hero/${hero.id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={heroImages(`./${hero.id}.jpg`)}
          alt={hero.superhero}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{hero.alter_ego}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{hero.superhero}</p>
    </Link>
  );
};
