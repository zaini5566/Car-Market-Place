import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { db } from "../../../config";
import { CarImages, carListing } from "../../../config/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "../../Shared/Service";
import CarItem from "../../components/CarItem";
import { FaTrashAlt } from "react-icons/fa";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setcarList] = useState([]);

  useEffect(() => {
    user && getUserCarListing();
  }, [user]);
  const getUserCarListing = async () => {
    const result = await db
      .select()
      .from(carListing)
      .leftJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .where(eq(carListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(carListing.id));

    const formattedResult = Service.FormatResult(result);
    setcarList(formattedResult);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await db.delete(CarImages).where(eq(CarImages.carListing, id));

      await db.delete(carListing).where(eq(carListing.id, id));

      setcarList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Error deleting listing. Please try again.");
    }
  };

  return (
    <div className="mt-6 ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-teal-600">My Listing</h2>
        <Link to="/addlisting">
          <Button className={"!bg-teal-600"}>+ Add Listing</Button>
        </Link>
      </div>
      <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2  flex justify-between items-center  rounded-l-2xl ">
              <Link to={"/addlisting?mode=edit&id=" + item?.id}>
                <Button variant="outline" className={"!bg-teal-600"}>
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(item?.id)}
                className={"cursor-pointer"}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
