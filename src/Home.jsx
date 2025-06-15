import { SignInButton } from "@clerk/clerk-react";
import React from "react";

import { Button } from "./components/ui/button"; // Ensure you have @mui/material installed
import Header from "./components/Header";
import Hero from "./components/hero";
import Category from "./components/Category";
import MostSearchCar from "./components/MostSearchCar";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Category />
      <MostSearchCar />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Home;
