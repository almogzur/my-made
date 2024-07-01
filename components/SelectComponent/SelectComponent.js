import {  UserContext} from 'Context/Context';
import { useContext, useState } from 'react';
import Select, { Option } from 'rc-select';

const SelectElemnt = ({
  id,
  hedlineText,
  SelectOptionsArray,
  className,
  value,       // prop to handle selected values
  onChange,    // prop to handle changes
}) => {
  return (
    <label htmlFor={id} 
      style={{ display: "flex", flexDirection: "column" }}
    >
      {hedlineText}
      <Select
        animation={"slide-up"}
        mode='multiple'
        multiple
        className={className}
        value={value}
        onChange={onChange}
      >
        {SelectOptionsArray.map((option, i) => (
          <Option value={option} key={i}>{option}</Option>
        ))}
      </Select>
    </label>
  );
};

export default SelectElemnt;
