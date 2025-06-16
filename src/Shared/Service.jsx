import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult = (resp) => {
  if (!Array.isArray(resp)) {
    console.error("Expected an array, got:", resp);
    return [];
  }

  const resultMap = {};
  const finalResult = [];

  resp.forEach((item) => {
    const listingId = item.carListing?.id;
    if (!listingId) return;

    if (!resultMap[listingId]) {
      resultMap[listingId] = {
        car: item.carListing,
        images: [],
      };
    }

    const rawImageData = item.carImages?.imageUrl;

    if (rawImageData) {
      try {
        // Clean and split the raw string: "{\"url1\",\"url2\"}" → ["url1", "url2"]
        const urls = rawImageData
          .replace(/[{}"]/g, "") // remove braces and quotes
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean);

        // Push each URL as a new object with fake ID (or use actual logic)
        urls.forEach((url, idx) => {
          resultMap[listingId].images.push({
            id: `${item.carImages?.id}_${idx}`, // unique ID using DB ID + index
            imageUrl: url,
          });
        });
      } catch (err) {
        console.error("Image parsing failed for:", rawImageData, err);
      }
    }
  });

  Object.values(resultMap).forEach((item) => {
    // ✅ Sort images by numeric prefix in ID (e.g., '41_0' → 41)
    item.images.sort((a, b) => {
      const aId = parseInt(a.id.split("_")[0], 10);
      const bId = parseInt(b.id.split("_")[0], 10);
      return aId - bId;
    });

    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });

  return finalResult;
};

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    "https://api-" + SendBirdApplicationId + ".sendbird.com/v3/users",
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

const CreateSendBirdChannel = (users, title) => {
  const payload = {
    user_ids: users,
    is_distinct: true,
    name: title || "Chat",
    operator_ids: [users[0]],
  };

  console.log("Creating channel with payload:", payload);

  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

export default {
  FormatResult,
  CreateSendBirdUser,
  CreateSendBirdChannel,
};
