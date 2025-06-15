import React from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiSpeedometerFill } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import { MdLocalGasStation } from "react-icons/md";

const DetailHeader = ({ carDetails }) => {
  return (
    <div>
      <h2 className="font-bold text-3xl">{carDetails?.listingTitle}</h2>
      <p className="text-sm">{carDetails?.tagline}</p>

      <div className="flex gap-2 mt-3 flex-wrap ">
        <div className="flex gap-2 items-center bg-blue-100 rounded-full p-1 px-3">
          <FaCalendarAlt className="h-4 w-4 text-blue-400" />
          <h2 className="text-blue-400 text-sm">{carDetails?.year}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-100 rounded-full p-1 px-3">
          <PiSpeedometerFill className="h-4 w-4 text-blue-400" />
          <h2 className="text-blue-400 text-sm">{carDetails?.mileage}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-100 rounded-full p-1 px-3">
          <TbManualGearbox className="h-4 w-4 text-blue-400" />
          <h2 className="text-blue-400 text-sm">{carDetails?.transmission}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-100 rounded-full p-1 px-3">
          <MdLocalGasStation className="h-4 w-4 text-blue-400" />
          <h2 className="text-blue-400 text-sm">{carDetails?.fuelType}</h2>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
