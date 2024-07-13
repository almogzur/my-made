import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { he } from 'date-fns/locale/he';
import { UserContext } from "@Context/Context";
import Colors from "@/lib/colors";
registerLocale('he', he )

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calinder = ({
     id,
    text,
    placeholder,
    title,
    onChange,
    required
}) => {
  const [startDate, setStartDate] = useState(new Date());


  const handleChange = (e) => {
    
    const value = JSON.stringify(e)

    onChange(id, value);
  };



  return (

     <DatePicker 
        required={required? true:false}
        title={title}
        id={id} 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        locale={he}
        closeOnScroll
        withPortal
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
        
       />

  );
};

export default Calinder