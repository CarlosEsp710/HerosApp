import React from "react";
import { Routes, Route } from "react-router-dom";

import { DCScreen } from "../components/DC/DCScreen";
import { HeroScreen } from "../components/hero/HeroScreen";
import { MarvelScreen } from "../components/Marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { NavBar } from "../components/ui/NavBar";

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
