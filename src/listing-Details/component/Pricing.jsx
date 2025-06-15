import React from "react";
import { Button } from "../../components/ui/button";
import { MdOutlineLocalOffer } from "react-icons/md";

function Pricing({ carDetails }) {
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
    <div className="p-10 rounded-xl shadow-md border">
      <h2 className="">Our Price</h2>
      <h2 className="font-bold text-4xl">
        Rs.{" "}
        {carDetails?.sellingPrice
          ? formatPrice(carDetails.sellingPrice)
          : "N/A"}
      </h2>

      <Button className={"w-full mt-7 !bg-teal-600"} size="lg">
        <MdOutlineLocalOffer className="text-lg mr-2" /> Make an Offer Price
      </Button>
    </div>
  );
}

export default Pricing;
