import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import carDetails from "../Shared/carDetails.json";
import InputFields from "./components/InputFields";
import DropDownField from "./components/DropDownField";
import TextAreaField from "./components/TextAreaField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import features from "../Shared/features.json";
import { Button } from "../components/ui/button";
import { db } from "../../config";
import { CarImages, carListing } from "../../config/schema";
import UploardImage from "./components/UploardImage";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment/moment";
import { eq } from "drizzle-orm";
import Service from "../Shared/Service";
import IconField from "./components/IconField";
const AddListing = () => {
  const [formdata, setformdata] = useState([]);
  const [featuresdata, setfeaturesdata] = useState([]);
  const [carinfo, setCarinfo] = useState();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const recordid = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit") {
      getListigDetails();
    }
  }, [mode]);

  const getListigDetails = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(CarImages, eq(carListing.id, CarImages.carListing))
      .where(eq(carListing.id, recordid));

    const formattedResult = Service.FormatResult(result);
    setCarinfo(formattedResult[0]);
    setformdata(formattedResult[0]);
    setfeaturesdata(formattedResult[0].features);
  };

  const navigate = useNavigate();
  const { user } = useUser();
  const [trigerUploardIamges, setrigerUploardIamges] = useState();
  const [loader, setloader] = useState(false);
  const handleInputChange = (name, value) => {
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFeatureChange = (name, value) => {
    setfeaturesdata((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setloader(true);

    let listingId = recordid;

    try {
      if (mode === "edit") {
        const result = await db
          .update(carListing)
          .set({
            ...formdata,
            features: featuresdata,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            postedOn: moment().format("DD/MM/YYYY"),
          })
          .where(eq(carListing.id, recordid))
          .returning({ id: carListing.id });

        if (result?.[0]?.id) {
          listingId = result[0].id;
          setrigerUploardIamges(result[0].id);
          // wait for image upload
        }
      } else {
        const result = await db
          .insert(carListing)
          .values({
            ...formdata,
            features: featuresdata,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/YYYY"),
          })
          .returning({ id: carListing.id });

        if (result?.[0]?.id) {
          listingId = result[0].id;
          setrigerUploardIamges(result[0].id);
          // wait for image upload
        }
      }

      // ✅ Navigate after everything is done
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setloader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-6 md:px-20 py-10">
        <h2 className="font-bold text-4xl">Add Listing</h2>
        <form className="md:p-10 p-5 border rounded-xl mt-10">
          {/* Car Details  */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-2">
                    <IconField icon={item.icon} />
                    {item.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputFields
                      item={item}
                      handleInputChange={handleInputChange}
                      carinfo={carinfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDownField
                      item={item}
                      carinfo={carinfo}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      carinfo={carinfo}
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* Features */}
          <div>
            <h2 className="font-medium text-xl my-6">Features List</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={featuresdata?.[item.name]}
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                  />
                  <h2>{item.label} </h2>
                </div>
              ))}
            </div>
          </div>
          {/* Car image */}

          <Separator className={"my-6"} />
          <UploardImage
            trigerUploardIamges={trigerUploardIamges}
            setloader={(v) => {
              setloader(v);
              navigate("/profile"); // ✅ Move navigation here, after image upload
            }}
            carinfo={carinfo}
            mode={mode}
          />

          <div>
            <Button
              type="submit"
              onClick={(e) => onsubmit(e)}
              className="justify-end mt-10 flex"
              disabled={loader}
            >
              {!loader ? (
                "Submit"
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
