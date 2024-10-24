import React, { useContext, useEffect } from 'react';
import { Select } from '@chakra-ui/react'


const israelRegions = [
  { value: 'צפון' },
  { value: 'חיפה' },
  { value: 'ירושלים' },
  { value: 'תל אביב' },
  { value: 'מרכז' },
  { value: 'באר שבע' },
  { value: 'דרום' },
  { value: 'אילת' },

  
];


const InputStyle = {
  width: "102%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  fontWeight: "bold"

};



const RegionSelect = ({
     value,
     PropsOnChange,
     PropsStyle, 
     PropsPlaceholder,
     propsId
     }) => {



  const handleChange = (e) =>{ 
     const value =  e.target.value    
      PropsOnChange(propsId,value)   
  }


  return(
     <Select
        icon={""}
        value={value}
        onChange={handleChange}
        placeholder={PropsPlaceholder}
        required
        style={PropsStyle? PropsStyle: InputStyle}
        defaultValue={null}
      >
       {israelRegions.map((obj,i)=>{
             const city = obj.value

        return <option   id={propsId}  key={` ${city} ${i}`} value={city}>{city}</option>
       })} 
      </Select>

      )
}

export default RegionSelect;
