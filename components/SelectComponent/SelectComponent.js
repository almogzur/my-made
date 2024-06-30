import Select, { Option } from 'rc-select';
import {  UserContext} from 'Context/Context';
import { useContext, useState } from 'react';


const SelectElemnt = ({
  id,
  hedlineText,
  SelectOptionsArray,
  className,
  contextType, // new prop to determine which part of the state to update
}) => {
  const [User, setUser] = useContext(UserContext);

  const handleChange = (value) => {
    setUser((prevState) => ({
      ...prevState,
      [contextType]: {
        ...prevState[contextType],
        // Assuming `vendorPaymentOptions` or similar key based on stateKey
        Payment: value,
      },
    }));
  };

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
        value={User[contextType]?.Payment || []}
        onChange={handleChange}
      >
        {SelectOptionsArray.map((option, i) => (
          <Option value={option} key={i}>{option}</Option>
        ))}
      </Select>
    </label>
  );
};

export default SelectElemnt;