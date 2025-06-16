import Header from "../components/Header";
import MyListing from "./components/myListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Inbox from "./components/Inbox";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const Profile = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "my-listing";
  const [tab, setTab] = useState(tabParam);
  return (
    <div>
      <Header />
      <div className="px-5 md:px-10 my-10">
        <Tabs value={tab} className="w-full">
          <TabsList className="w-full flex justify-start">
            <TabsTrigger
              value="my-listing"
              onClick={() => setTab("my-listing")}
            >
              My Listing
            </TabsTrigger>
            <TabsTrigger value="inbox" onClick={() => setTab("inbox")}>
              Inbox
            </TabsTrigger>
            <TabsTrigger value="profile" onClick={() => setTab("profile")}>
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-listing">
            <MyListing />
          </TabsContent>
          <TabsContent value="inbox">
            <Inbox />
          </TabsContent>
          <TabsContent value="profile">Profile</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
