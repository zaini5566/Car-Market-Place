import React from "react";
import data from "../Shared/data";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="md:mt-15 mt-10">
      <h2 className="font-bold text-3xl text-center mb-6 text-teal-600">
        Brows By Type
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 md:px-20 px-5 md:mt-10">
        {data.Category.map((category, index) => (
          <Link to={"search/" + category.name}>
            <div className=" flex  flex-col  items-center m-auto hover:shadow-md cursor-pointer">
              <img src={category.icon} alt="" width={150} height={35} />
              <h2 className="mt-2 font-bold text-sm">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
