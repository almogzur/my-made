import React, { useContext } from 'react';
import Select from 'react-select';
import { StateContext } from '../../context';

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

const RegionSelect = ({ value, PropsOnChange }) => {
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
    <div style={{marginBottom:"15px",marginTop:"15px", fontWeight: "bold"}}>

            <Select
        value={israelRegions.find(option => option.value === value)}
        onChange={handleChange}
        options={israelRegions}
        placeholder="אזור"
        isClearable
      />
    </div>
  );
};

export default RegionSelect;
