import React, {useContext} from "react"
import { VendorData } from "contaxt/contaxt";
import InputElemnt from "@/components/InputElemnt"
import Calinder from "@/components/Calinder";
import SelectElemnt from "@/components/SelectElemnt";


function compareDatesSafe(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return 'One or both of the dates are invalid';
  }
  if (date1 < date2) {
      return 'date1 is before date2';
  } else if (date1 > date2) {
      return 'date1 is after date2';
  } else {
      return 'date1 is equal to date2';
  }
}

function VenderForm () {

  const [data,setData]=useContext(VendorData)

  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      const response = await fetch('/api/vendor/newvendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });

      if (response.ok) {
        // Handle successful response
        console.log('Form submitted successfully');
      } else {
        // Handle error response
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

 
    return (
     <form 
     onSubmit={handleSubmit}
        className="vender-form-wrapper" 

     >
       <InputElemnt 
        type={"text"}
        id={"venderFullName"}
        text={"שם מלא"}  
        required
       />

      <InputElemnt 
        type={"tel"}
        id={"venderPhone"}
        text={"טלפון"}

      />

      <InputElemnt
        type={"email"}
        id={"vendorEmail"}
        text={"מייל"}

      />
      
      <InputElemnt
        type={"text"}
        text={"שם העסק"}
        id={"venderBussniseName"}

      />
      <InputElemnt
         type={"number"}
         text={"מחיר"}
         id={"price"}
         required
      />

      <SelectElemnt/>

     <Calinder
      id={"venderOpenDate"}
      text={"תאריך התחלה"}
     />
     <Calinder
      id={"venderEndDate"}
      text={"תאריך סיום"}
     />
   
      <button 
      type="submit"
      className="vender-form-btn"

      >הרשמה 
      </button>

    
        </form>
      );

      
}

export default VenderForm ;