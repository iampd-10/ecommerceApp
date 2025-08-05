import React from "react";
import Footer from "../SubComponents/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../SubComponents/Hero/Hero";
import Header from "../SubComponents/Header/Header";
import NotFoundPage from "../SubComponents/NoPage/NotFoundPage";
import ProductComponent from "../SubComponents/Products/ProductComponent";
import UserRegister from "../SubComponents/Authentication/UserRegister";
import EmailVerification from "../SubComponents/Authentication/EmailVerification"; 
import UserLogin from "../SubComponents/Authentication/UserLogin";
import AddProduct from "../SubComponents/Products/AddProduct";

function MotherRoute() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFoundPage/>} />
          <Route path="/products" element={<ProductComponent/>} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
          <Route path="/user/verify/:token" element={<EmailVerification/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default MotherRoute;