import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { useParams } from "react-router-dom";
import { db } from "../../../config";
import { CarImages, carListing } from "../../../config/schema";
import Service from "../../Shared/Service";
import CarItem from "../../components/CarItem";
import { eq } from "drizzle-orm";

const SearchByCategory = () => {
  const [carlisting, setcarlisting] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    getCarListing();
  }, []);

  const getCarListing = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .where(eq(carListing.category, category));

    const res = Service.FormatResult(result);
    setcarlisting(res);
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:p-20">
        <h2 className="font-bold text-4xl ">{category}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-8">
          {carlisting.map((item, index) => (
            <div key={index}>
              <CarItem car={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
