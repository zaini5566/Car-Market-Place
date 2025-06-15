import React from "react";
import CarSpecification from "../../Shared/CarSpecification";
import IconField from "../../AddListing/components/IconField";

function Spacification({ carDetails = {} }) {
  const specifications = CarSpecification || [];

  return (
    <div className="p-10 rounded-xl shadow-md mt-7">
      {specifications.map((item, index) => (
        <div
          className="gap-2 mt-5 flex items-center justify-between"
          key={index}
        >
          <h2 className="flex gap-2 items-center text-teal-600">
            <IconField icon={item?.icon} />
            <span>{[item.name]}</span>
          </h2>

          {item.name && <h2>{carDetails[item.name]}</h2>}

          {/* Safely access carDetails properties */}
        </div>
      ))}
    </div>
  );
}

export default Spacification;
