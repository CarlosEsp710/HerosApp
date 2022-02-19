import { heroes } from "../assets/data/heroes";

export const getHerosByName = (name = "") => {
  if (name.length === 0) {
    return [];
  }

  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
};
