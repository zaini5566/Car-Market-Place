import React from "react";
import { Input } from "../../components/ui/input";
const InputFields = ({ item, handleInputChange, carinfo }) => {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item.required}
        defaultValue={carinfo?.[item.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  );
};

export default InputFields;
