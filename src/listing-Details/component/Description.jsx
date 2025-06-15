import React from "react";

const Description = ({ carDetails }) => {
  return (
    <div className="p-5 rounded-xl bg-white shadow-md mt-6 border">
      <h2 className="my-2 font-medium text-2xl">Description</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {carDetails?.listingDescription}
      </div>
      {/* <div>{carDetails?.listingDescription}</div> */}
    </div>
  );
};

export default Description;
