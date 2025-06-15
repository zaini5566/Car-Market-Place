import React, { useEffect, useState } from "react";
import FakeData from "../Shared/FakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "../../config";
import { CarImages, carListing } from "../../config/schema";
import { desc, eq } from "drizzle-orm";
import Service from "../Shared/Service";
const MostSearchCar = () => {
  const [carList, setcarList] = useState([]);
  useEffect(() => {
    getMostPopularCar();
  }, []);

  const getMostPopularCar = async () => {
    const result = await db
      .select()
      .from(carListing)
      .leftJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .orderBy(desc(carListing.id));

    const formattedResult = Service.FormatResult(result);
    setcarList(formattedResult);
  };
  console.log("Most Searched Car LISt", carList);
  return (
    <div className="xl:mx-24 mx-5">
      <h2 className="text-center font-bold text-3xl mt-16 mb-5">
        Most Search Cars
      </h2>
      <Carousel>
        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem className="md:basis-1/3 basis-1/1.5 lg:basis-1/4">
              <CarItem car={car} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!bg-gray-300  max-md:hidden " />
        <CarouselNext className="!bg-gray-300 max-md:hidden" />
      </Carousel>
    </div>
  );
};

export default MostSearchCar;
