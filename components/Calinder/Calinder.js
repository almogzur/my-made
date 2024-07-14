import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { he } from 'date-fns/locale/he';
import Colors from "@/lib/colors";



// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calinder = ({
     id,
    text,
    placeholder,
    title,
    onChange,
    required,popperClassNameProps
}) => {
  const [startDate, setStartDate] = useState(new Date());
  
  const labelStyle = {       
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center', 
      width:"100%",

      }

  const handleChange = (e) => {
    const value = JSON.stringify(e)
    onChange(id, value);
  };

useEffect(()=>{
  registerLocale('he', he )
})

  return (
   <label 
     style={labelStyle}
     >
    <strong>{text}</strong>
     <DatePicker 
        locale={he}
        required={required? true:false}
        title={title}
        withPortal
        id={id} 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        closeOnScroll
        showYearDropdown
        showMonthDropdown
        //onSelect={(e)=>{console.log(e)}}
        showTimeSelect
        showFullMonthYearPicker
        showPreviousMonths
        showPopperArrow
        placeholderText={placeholder}
        onSelect={handleChange}
        isClearable
        containerRef={"main"}
        className="vendor-calindre"
        clearButtonClassName="vendor-calinder-clear-btn"
        popperClassName="vendor-calindr"
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        

   

        
       />
    </label>
  );
};

export default Calinder