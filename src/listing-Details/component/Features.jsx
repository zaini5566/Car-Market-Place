import { FaCheck } from "react-icons/fa6";

function Features({ features }) {
  if (!features) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="p-5 bg-white rounded-xl border shadow-md ">
        <h2 className="font-medium text-2xl">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {Object.entries(features).map(([features, value]) => (
            <div className="flex items-center gap-2">
              <FaCheck className="rounded-full bg-blue-100 text-teal-600 p-1" />
              <h2>{features} </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
