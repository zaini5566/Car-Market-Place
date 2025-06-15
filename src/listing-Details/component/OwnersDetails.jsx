import React from "react";
import { Button } from "../../components/ui/button";
import Service from "../../Shared/Service";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function OwnersDetails({ carDetails }) {
  const { user } = useUser();
  const navigation = useNavigate();
  const OnMEssageOwnerButtonClick = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = carDetails?.createdBy.split("@")[0];
    //  Current User ID

    try {
      await Service.CreateSendBirdUser(
        userId,
        user?.fullName,
        user?.imageUrl
      ).then((res) => {});
    } catch (e) {}
    // Onwer USEr ID
    try {
      await Service.CreateSendBirdUser(
        ownerUserId,
        carDetails?.userName,
        carDetails?.userImageUrl
      ).then((res) => {});
    } catch (e) {}

    try {
      await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        carDetails?.listingTitle
      ).then((res) => {
        navigation("/profile");
      });
    } catch (e) {}
  };

  return (
    <div className="p-10 mt-7 border rounded-xl shadow-md">
      <h2 className="font-medium mb-3 text-2xl">Owner / Deals </h2>
      <img
        src={carDetails?.userImage}
        className="w-[70px] h-[70px] rounded-full"
        alt=""
      />
      <h2 className="mt-2 font-bold text-xl">{carDetails?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetails?.createdBy}</h2>

      <Button
        onClick={OnMEssageOwnerButtonClick}
        className={"w-full mt-6 bg-teal-600"}
      >
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetails;
