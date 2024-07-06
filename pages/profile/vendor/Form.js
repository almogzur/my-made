import React, {useContext} from "react"
import { UserContext} from "Context/Context";
import InputElemnt from "@/components/InputElemnt/InputElemnt"
import Calinder from "@/components/Calinder/Calinder";
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";

 function  VenderForm ({PAGE_STATE}) {

  const [state,setState]=useContext(UserContext)
  const { data: session ,status ,update} = useSession()
  
   if(status==="loading"){
    return <LoadingSpinner/>
   }

 

    return (
    <form 
        className="vender-form-wrapper" > 
      <h1 > הרשמת נותן שירות   </h1>
      <div className="vendor-form-split1"
      >
       <InputElemnt 
          type={""} 
          text={"שם מלא"}
          id={"fullName"}
          labelClassName={""}
          required
          inputClassName={""}
          stateKey={PAGE_STATE}
          value={""}
          onChange={()=>{}}
       />

      <InputElemnt 
        type={"tel"}
        id={"Phone"}
        text={"טלפון"}
        contextType={"Vendor"}
      />
      </div>
      <br/>
      <div className=" vendor-form-split2" >
      <InputElemnt
        type={"email"}
        id={"Email"}
        text={"מייל"}
        contextType={"Vendor"}
      />
      
      <InputElemnt
        type={"text"}
        text={"שם העסק"}
        id={"BussniseName"}
        contextType={"Vendor"}
      />

      <InputElemnt
         type={"number"}
         text={"מחיר"}
         id={"Price"}
         contextType={"Vendor"}
      />

      <SelectElemnt
        SelectOptionsArray={["אשרי", "מזומן","ביט" ,"פיפאל"]}
        text={"קבלת תשלום"}
        className="vendor-payment"
        hedlineText={"אפשריות תשלום"}
        contextType={"isVendor"}
      />

     <Calinder
      id={"venderOpenDate"}
      text={" זמין מ"}
     />
     <Calinder
      id={"venderEndDate"}
      text={"סיום"}
     />
      {/** User Data Save to db  */}
      <button 
       type="submit"
       className="vender-form-btn"
      >רישום 
      </button>
      </div>
    </form>
      );

      
}

export default VenderForm ;