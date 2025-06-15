import React from "react";
import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { Link } from "react-router-dom";
const CarItem = ({ car }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      // Crores
      return (price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1) + " Cr";
    } else if (price >= 100000) {
      // Lakhs
      return (price / 100000).toFixed(price % 100000 === 0 ? 0 : 1) + " Lacs";
    } else {
      // Less than 1 lakh
      return price.toLocaleString(); // Adds commas like 99,999
    }
  };

  return (
    <Link to={"/listing/" + car?.id}>
      <div className="rounded-xl  bg-white border hover:shadow-md cursor-pointer ">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
          New
        </h2>
        <img
          src={car?.images[0]?.imageUrl}
          width={"100%"}
          height={250}
          alt=""
          className="rounded-t-xl h-[180px] object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-lg  text-teal-600 mb-2">
            {car.listingTitle.length > 22
              ? `${car.listingTitle.slice(0, 22)}...`
              : car.listingTitle}
          </h2>
          <Separator />

          <div className="grid grid-cols-3 mt-5 ">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car.mileage}Miles</h2>
            </div>
            <div className="flex flex-col items-center">
              <TbBrandSpeedtest className="text-lg mb-2" />
              <h2>{car.fuelType}</h2>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2>{car.transmission}</h2>
            </div>
          </div>

          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-teal-600">
              Rs.{formatPrice(car.sellingPrice)}
            </h2>
            <h2 className="text-teal-600 text-sm flex gap-2 items-center cursor-pointer">
              <IoMdOpen /> View Details
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarItem;
