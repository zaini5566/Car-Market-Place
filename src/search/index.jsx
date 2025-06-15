import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../config";
import { CarImages, carListing } from "../../config/schema";
import { eq } from "drizzle-orm";
import Service from "../Shared/Service";
import CarItem from "../components/CarItem";
import Header from "../components/Header";
import Search from "../components/Search";

const SearchByOptions = () => {
  const [searchParams] = useSearchParams();
  const condition = searchParams.get("cars");
  const make = searchParams.get("make");
  const price = searchParams.get("price");

  const [carlist, setcarlist] = useState([]);

  useEffect(() => {
    getcarlist();
  }, [condition, make]);

  const getcarlist = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .where(condition != undefined && eq(carListing.condition, condition))
      .where(make != undefined && eq(carListing.make, make));
    const res = Service.FormatResult(result);
    setcarlist(res);
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:p-20">
        <h2 className="font-bold text-4xl ">Search Result</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-8">
          {carlist.map((item, index) => (
            <div key={index}>
              <CarItem car={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByOptions;
