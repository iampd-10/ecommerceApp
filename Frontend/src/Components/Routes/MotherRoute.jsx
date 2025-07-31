import React from "react";
import Footer from "../SubComponents/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../SubComponents/Hero/Hero";
import Header from "../SubComponents/Header/Header";
import NotFoundPage from "../SubComponents/NoPage/NotFoundPage";

function MotherRoute() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default MotherRoute;
