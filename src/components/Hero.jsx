import React from "react";
import Search from "./Search";

const Hero = () => {
  return (
    <div className="flex  flex-col items-center  gap-5 p-5 md:p-10 py-20 h-[650px] bg-[#eef0fc]">
      <h2 className="text-xl font-(family-name:oleo-script-regular) max-md:text-center">
        Lets Find a Suitable Car For You
      </h2>
      <h2 className=" text-[60px] font-bold text-teal-600 max-md:leading-18 max-md:text-center">
        Premium Car Dealers
      </h2>
      <Search />
      <img
        src="/honda.png"
        alt="Tesla"
        className="w-[70%] max-sm:w-[100%] mt-10 max-sm:mt-30px"
      />
      {/* <img src="/tesla.png" alt="Tesla" className="mt-10" /> */}
    </div>
  );
};

export default Hero;
