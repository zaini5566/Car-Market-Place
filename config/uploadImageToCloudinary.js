import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace this
  formData.append("cloud_name", "dzmefxevu"); // Optional for direct unsigned uploads

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dzmefxevu/image/upload",
    formData
  );

  return response.data.secure_url; // Return image URL
};
