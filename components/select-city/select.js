import React, { useContext } from 'react';
import Select from 'react-select';
import { StateContext } from '../../context';
import { log } from 'util';

const STATE_KEY = "Order";

const israelRegions = [
  { value: 'צפון', label: 'צפון' },
  { value: 'מרכז', label: 'מרכז' },
  { value: 'דרום', label: 'דרום' },
  { value: 'ירושלים', label: 'ירושלים' },
  { value: 'תל אביב', label: 'תל אביב' },
  { value: 'חיפה', label: 'חיפה' },
  { value: 'אילת', label: 'אילת והסביבה' }
];


const defualtStyle  = {
   marginBottom:"15px",
   marginTop:"15px",
   fontWeight: "bold",
  }

const RegionSelect = ({ value, PropsOnChange , PropsStyle ,PropsPlaceholder }) => {
  
  const [state, setState] = useContext(StateContext);

  const handleChange = (selectedOption) => {
    const newCity = selectedOption ? selectedOption.value : "";
    setState((prevState) => ({
      ...prevState,
      [STATE_KEY]: {
        ...prevState[STATE_KEY],
        city: newCity,
      },
    }));

    if (PropsOnChange) {
      PropsOnChange(selectedOption); // Call optional prop function if provided
    }
  };

  return (
    <div style={PropsStyle? PropsStyle : defualtStyle}>

       <Select
        value={israelRegions.find(option => option.value === value)}
        onChange={handleChange}
        options={israelRegions}
        placeholder={PropsPlaceholder}
        isClearable
      
      />
    </div>
  );
};

export default RegionSelect;
