import React, { useContext } from "react";
import { UserContext } from "Context/Context";
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";

// Dynamic imports with loading component
const InputElemnt = dynamic(() => import("@/components/InputElemnt/InputElemnt"), {
  loading: () => <LoadingSpinner />,
  ssr: true, 
});

const Calinder = dynamic(() => import("@/components/Calinder/Calinder"), {
  loading: () => <LoadingSpinner />,
  ssr: true, 
});

const SelectElemnt = dynamic(() => import("@/components/SelectComponent/SelectComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: true, 
});

function VenderForm({ PAGE_STATE }) {
  const [state, setState] = useContext(UserContext);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <form style={{
       height:"100%",
       width:"inherit",
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     
    }}>
      <h1> הרשמת נותן שירות </h1>
      <div
        style={{
          width: "75%",
          height:"100px",
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-evenly",
          alignItems:"center",
          borderRadius:"10px",
          border:" 1px solid #404040",
          }}
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
          onChange={() => {}}
        />

        <InputElemnt
          type={"tel"}
          id={"Phone"}
          text={"טלפון"}
          contextType={"Vendor"}
        />
      </div>
      <br />
      <div style={{
        width:"60%",
        border: "1px solid #404040",
        height:"400px",
        borderRadius:"15px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}>
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
          SelectOptionsArray={["אשרי", "מזומן", "ביט", "פיפאל"]}
          text={"קבלת תשלום"}
          className="vendor-payment"
          hedlineText={"אפשריות תשלום"}
          contextType={"isVendor"}
        />

        <Calinder id={"venderOpenDate"} text={" זמין מ"} />
        <Calinder id={"venderEndDate"} text={"סיום"} />

        {/** User Data Save to db  */}
        <button type="submit" className="vender-form-btn">
          רישום
        </button>
      </div>
    </form>
  );
}

export default VenderForm;
