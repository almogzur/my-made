import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { he } from 'date-fns/locale/he';
import { UserContext } from "@Context/Context";

registerLocale('he', he )
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calinder = ({id,text}) => {
  const [startDate, setStartDate] = useState(new Date());
  



  return (
    <label 
      htmlFor={id}
      style={{display:"flex",flexDirection:"column"}}
    >
    {text}
     <DatePicker 
        id={id} 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        locale={he}
        showPreviousMonths
        showTimeInput
        withPortal
        allowSameDay
        showFullMonthYearPicker
        showTwoColumnMonthYearPicker
        closeOnScroll
       //onClickOutside={handleChange}
        
        
       />

    </label>
  );
};

export default Calinder