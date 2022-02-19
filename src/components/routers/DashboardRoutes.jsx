import React from "react";
import { Routes, Route } from "react-router-dom";

import { DCScreen } from "../DC/DCScreen";
import { HeroScreen } from "../hero/HeroScreen";
import { MarvelScreen } from "../Marvel/MarvelScreen";
import { SearchScreen } from "../search/SearchScreen";
import { NavBar } from "../ui/NavBar";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="marvel" element={<MarvelScreen />} />
        <Route path="dc" element={<DCScreen />} />
        <Route path="search" element={<SearchScreen />} />
        <Route path="hero/:heroId" element={<HeroScreen />} />
        <Route path="/" element={<MarvelScreen />} />
      </Routes>
    </>
  );
};
