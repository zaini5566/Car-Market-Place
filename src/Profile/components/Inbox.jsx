import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SendBirdProvider } from "@sendbird/uikit-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";

const Inbox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("tab") || "my-listing";
  const channelUrl = searchParams.get("channel_url");
  const [tab, setTab] = useState(tabParam);
  const [userID, setUserID] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const id = user.primaryEmailAddress?.emailAddress.split("@")[0];
      setUserID(id);
    }
  }, [user]);

  // Sync tab state with URL param
  useEffect(() => {
    setTab(tabParam);
  }, [tabParam]);

  // When user clicks a tab, update the URL
  const handleTabChange = (value) => {
    setTab(value);
    searchParams.set("tab", value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div style={{ width: "100%", height: "500px" }}>
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userID}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div>
              <GroupChannelList
                onChannelSelect={(channel) => {
                  // Optionally update channel URL in search params or internal state
                  console.log("Selected:", channel?.url);
                }}
                channelListQueryParams={{
                  includeEmpty: true,
                }}
              />
            </div>
            <div className="md:col-span-2 h-full">
              <GroupChannel channelUrl={channelUrl} />
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
};

export default Inbox;
