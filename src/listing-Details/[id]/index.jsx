import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import DetailHeader from "../component/detailHeader";
import { useParams } from "react-router-dom";
import { db } from "../../../config";
import { CarImages, carListing } from "../../../config/schema";
import { eq } from "drizzle-orm";
import Service from "../../Shared/Service";
import ImageGallery from "../component/ImageGallery";
import Description from "../component/Description";
import Features from "../component/Features";
import Pricing from "../component/pricing";
import Spacification from "../component/Spacification";
import OwnersDetails from "../component/OwnersDetails";
import Footer from "../../components/Footer";
import MostSearchCar from "../../components/MostSearchCar";

const ListingDetails = () => {
  const { id } = useParams();
  const [carDetails, setCardetails] = useState();
  useEffect(() => {
    if (id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // or "auto" if you want instant scroll
      });
    }
    getCarDetails();
  }, [id]);

  const getCarDetails = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .where(eq(carListing.id, id));

    const res = Service.FormatResult(result);
    setCardetails(res[0]);
    console.log("Detials", res);
  };
  return (
    <div>
      <Header />
      <div className="p-5 xl:p-20">
        <DetailHeader carDetails={carDetails} />

        <div className="grid grid-col-1 md:grid-cols-3 w-full mt-10 gap-5">
          <div className="md:col-span-2">
            {/* image Gallery  */}
            <ImageGallery carDetails={carDetails} />

            {/* discription  */}
            <Description carDetails={carDetails} />
            {/* featrure  */}
            <Features features={carDetails?.features} />
          </div>
          <div>
            {/* car Property  */}
            <Pricing carDetails={carDetails} />
            {/* Owner Details  */}
            <Spacification carDetails={carDetails} />

            <OwnersDetails carDetails={carDetails} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <MostSearchCar />
        <Footer />
      </div>
    </div>
  );
};

export default ListingDetails;
