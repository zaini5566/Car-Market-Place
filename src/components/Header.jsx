import { SignInButton, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link, Links } from "react-router-dom";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-4 shadow-sm bg-transparent pt-5 container">
      <Link to={"/"}>
        {" "}
        <div className=" font-bold text-xl text-teal-600">Zee Carz</div>
      </Link>

      <ul className="gap-16 hidden md:flex Blue">
        <li className="font-bold hover:scale-105 transition-all cursor-pointer hover:text-blue-500 text-white">
          Home
        </li>
        <li className="font-bold hover:scale-105 transition-all cursor-pointer hover:text-blue-500 text-white">
          Search
        </li>
        <li className="font-bold text-white hover:scale-105 transition-all cursor-pointer hover:text-blue-500">
          Contact
        </li>
      </ul>

      {isSignedIn ? (
        <div className=" flex gap-3">
          <UserButton />
          <Link to={"/profile?tab=my-listing"}>
            <Button className={"!text-white bg-teal-600 cursor-pointer"}>
              Add Listing
            </Button>
          </Link>
        </div>
      ) : (
        <Button
          className={"!text-white bg-teal-600 hover:bg-teal-700 cursor-pointer"}
        >
          <SignInButton className="cursor-pointer">Sell Car</SignInButton>
        </Button>
      )}
    </div>
  );
};

export default Header;
