import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  const { heroId } = useParams();
  const navigate = useNavigate();

  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  if (!hero) {
    return <Navigate to="/" />;
  }

  const handleReturn = () =>
    navigate(-1, {
      replace: true,
    });

  return (
    <div className="container">
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={heroImages(`./${hero.id}.jpg`)}
            alt={hero.superhero}
            className="w-full h-96 object-center object-cover group-hover:opacity-75"
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {hero.superhero}
          </h1>
          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 ">
            <div>
              <h3 className="text-xl font-medium tracking-tight">Alter-ego</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{hero.alter_ego}</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-medium tracking-tight">
                First appearance
              </h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {hero.first_appearance}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-medium text-gray-900">Characters</h3>
              <div className="mt-4">
                <ul className="pl-4 list-disc text-sm space-y-2">
                  {hero.characters.split(",").map((character) => (
                    <li key={character.trim()} className="text-gray-400">
                      <span className="text-gray-600">{character.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={handleReturn}
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
