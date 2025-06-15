import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import data from "../Shared/data";
import { Link } from "react-router-dom";
const Search = () => {
  const [cars, setcars] = useState();
  const [make, setMake] = useState();
  const [price, setprice] = useState();
  return (
    <div className="flex p-2 md:p-5 bg-white rounded-full md:rounded-full md:flex-row md:gap-10 px-5 items-center w-[100%] md:w-[60%]">
      <Select onValueChange={(value) => setcars(value)}>
        <SelectTrigger className="w-[180px] !outline-none !bg-white border-none !shadow-none  !text-black">
          <SelectValue placeholder="Cars" className="bg-white" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New Car</SelectItem>
          <SelectItem value="Used">Old</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="w-[180px] !outline-none !bg-white !border-none !shadow-none !text-black">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {data.carMakes.map((maker, index) => (
            <SelectItem value={maker.name}>{maker.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setprice(value)}>
        <SelectTrigger className="w-[180px] !outline-none !bg-white !border-none !shadow-none !text-black">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {data.Pricing.map((price, index) => (
            <SelectItem value={price.Amount}>{price.Amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Link to={"/search?cars=" + cars + "&make=" + make + "&price=" + price}>
        <CiSearch className="md:text-[50px] text-[30px] text-white bg-teal-600 rounded-full md:p-3 p-1 hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search;
