import React from "react";
import { Textarea } from "@/components/ui/textarea";
const TextAreaField = ({ item, handleInputChange, carinfo }) => {
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        defaultValue={carinfo?.[item.name]}
        required={item.required}
      />
    </div>
  );
};

export default TextAreaField;
