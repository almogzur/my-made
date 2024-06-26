import React, {useContext} from "react"
import { VendorData } from "contaxt/contaxt";
import InputElemnt from "@/components/InputElemnt/InputElemnt"
import Calinder from "@/components/Calinder/Calinder";
import SelectElemnt from "@/components/SelectComponent/SelectComponent"


function VenderForm () {

  const [data,setData]=useContext(VendorData)

  const handleSubmit = async (event) => {

    try {
      const response = await fetch('/api/vendor', {
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
     <h1>הרשמת נותן שירות </h1>
       <InputElemnt 
        type={"text"}
        id={"venderFullName"}
        text={"שם מלא"}  
        
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
         
      />

      <SelectElemnt
      SelectOptions={[]}
        text={"קבלת תשלום"}
        className="vendor-payment"
        hedlineText={"אפשריות תשלום"}
      />

     <Calinder
      id={"venderOpenDate"}
      text={" זמין מ"}
     />
     <Calinder
      id={"venderEndDate"}
      text={"סיום"}
     />
   
      <button 
       type="submit"
       className="vender-form-btn"
      >רישום 
      </button>

 
        </form>
      );

      
}

export default VenderForm ;