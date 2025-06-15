import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { uploadImageToCloudinary } from "../../../config/uploadImageToCloudinary";
import { db } from "../../../config";
import { CarImages } from "../../../config/schema";
import { eq } from "drizzle-orm";

const UploardImage = ({ trigerUploardIamges, setloader, carinfo, mode }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [editImageList, setEditImageList] = useState([]);

  // Load existing images in edit mode
  useEffect(() => {
    if (mode === "edit" && carinfo?.images?.length >= 0) {
      const formatted = carinfo.images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
      }));
      setEditImageList(formatted);
    }
  }, [mode, carinfo]);

  // Trigger upload when either trigger changes or new files are selected
  useEffect(() => {
    if (trigerUploardIamges && selectedFileList.length > 0) {
      uploadImagesToCloudinary();
    }
  }, [trigerUploardIamges, selectedFileList]);

  const onFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFileList((prev) => [...prev, ...files]);
  };

  const onImageRemove = (file) => {
    setSelectedFileList((prev) => prev.filter((f) => f !== file));
  };

  const onImageRemoveEdit = async (image, index) => {
    const dbImageId = parseInt(String(image.id).split("_")[0], 10);

    if (isNaN(dbImageId)) {
      console.error("Invalid image ID:", image.id);
      return;
    }

    try {
      await db.delete(CarImages).where(eq(CarImages.id, dbImageId));
      const newList = editImageList.filter((_, i) => i !== index);
      setEditImageList(newList);
    } catch (err) {
      console.error("Error deleting image from DB:", err);
    }
  };

  const uploadImagesToCloudinary = async () => {
    setloader(true);
    try {
      for (const file of selectedFileList) {
        const imageUrl = await uploadImageToCloudinary(file);
        await db.insert(CarImages).values({
          imageUrl,
          carListing: trigerUploardIamges,
        });
      }
      setSelectedFileList([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setloader(false);
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 rounded-2xl">
        {/* Existing images from DB in edit mode */}
        {mode === "edit" &&
          editImageList.map((image, index) => (
            <div key={index} className="relative">
              <IoMdCloseCircle
                className="absolute m-3 text-xl text-white cursor-pointer z-10"
                onClick={() => onImageRemoveEdit(image, index)}
              />
              <img
                src={image.imageUrl}
                alt={`Uploaded ${index}`}
                className="w-full h-[130px] object-cover rounded-2xl"
              />
            </div>
          ))}

        {/* New images before uploading */}
        {selectedFileList.map((file, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-3 text-xl text-white cursor-pointer z-10"
              onClick={() => onImageRemove(file)}
            />
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-[130px] object-cover rounded-2xl"
            />
          </div>
        ))}

        {/* Upload button */}
        <label htmlFor="upload-image">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-4 hover:shadow-md cursor-pointer">
            <h2 className="text-lg text-center">+</h2>
          </div>
        </label>
        <input
          id="upload-image"
          type="file"
          multiple
          className="hidden"
          onChange={onFileUpload}
        />
      </div>
    </div>
  );
};

export default UploardImage;
