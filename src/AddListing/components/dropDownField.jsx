import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DropDownField = ({ item, handleInputChange, carinfo }) => {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
        defaultValue={carinfo?.[item.name]}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              carinfo?.[item.name] ? carinfo?.[item.name] : item.label
            }
          />
          <SelectContent>
            {item?.options?.map((option, index) => (
              <SelectItem value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default DropDownField;
