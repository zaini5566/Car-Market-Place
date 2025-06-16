import React from "react";
import { Button } from "../../components/ui/button";
import Service from "../../Shared/Service";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";

function OwnersDetails({ carDetails }) {
  const { user, isSignedIn } = useUser();
  const navigation = useNavigate();

  const OnMEssageOwnerButtonClick = async () => {
    if (!isSignedIn) {
      return; // The button will be wrapped in SignInButton when not signed in
    }

    const userId = user.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = carDetails?.createdBy?.split("@")[0];

    if (!userId || !ownerUserId) {
      console.error("Missing userId or ownerUserId");
      return;
    }

    try {
      // Ensure both users exist in Sendbird
      await Promise.all([
        Service.CreateSendBirdUser(
          userId,
          user?.fullName,
          user?.imageUrl
        ).catch((e) => {
          if (e.response?.data?.code !== 400202) {
            console.error("User create failed", e.response?.data || e.message);
          }
        }),
        Service.CreateSendBirdUser(
          ownerUserId,
          carDetails?.userName,
          carDetails?.userImageUrl
        ).catch((e) => {
          if (e.response?.data?.code !== 400202) {
            console.error("Owner create failed", e.response?.data || e.message);
          }
        }),
      ]);

      // Create or get the distinct channel
      const channel = await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        carDetails?.userName
      );

      if (channel?.data?.channel_url) {
        navigation(
          `/profile?tab=inbox&channel_url=${encodeURIComponent(
            channel.data.channel_url
          )}`
        );
      } else {
        console.error("Channel creation failed", channel?.data || channel);
      }
    } catch (e) {
      console.error("Error initiating chat", e.response?.data || e.message);
    }
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

      {isSignedIn ? (
        <Button
          onClick={OnMEssageOwnerButtonClick}
          className={"w-full mt-6 bg-teal-600"}
        >
          Message Owner
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button className={"w-full mt-6 bg-teal-600"}>Message Owner</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default OwnersDetails;
