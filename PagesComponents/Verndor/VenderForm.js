import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "Context/Context";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/SpiningLoader/SpiningLoader";
import InputElement from "@/components/InputElemnt/InputElemnt";
import Calinder from "@/components/Calinder/Calinder";
import SelectElemnt from "@/components/SelectComponent/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import Colors from "@/lib/colors";
import useGetUser from "@/lib/hooks/useGetUser";
import MongoSpinner from "@/components/MongoSpinner/MongoSpinner";
import {m,LazyMotion} from 'framer-motion'
import features from '@/lib/features'




const VendorForm = ({ STATE_KEY }) => {

  const [ state, setState ] = useContext(StateContext);
  const { data: session, status } = useSession();
  const { UserData, dbloading, profileError } = useGetUser(session?.user?.email);
  const [resolvedUser, setResolvedUser] = useState(null);
  const discriptionPlaceholder = ` המחיר המבוקש הוא עבור ... 
מלל חופשי `
  useEffect(() => {
    console.log(STATE_KEY);
    // Check if UserData is available and update resolvedUser
    if (UserData) {
      setResolvedUser(UserData);
    }
  }, [UserData]);

  useEffect(() => {
    // If resolvedUser is set, update the state
    if (resolvedUser) {
      const {
        BussniseName: dbBussniseName,
        price: dbPrice,
        OpenDate: dbOpenDate,
        EndDate: dbEndDate,
        discription: dbDiscription
      } = resolvedUser;

      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          BussniseName: dbBussniseName || prevState[STATE_KEY]?.BussniseName,
          price: dbPrice || prevState[STATE_KEY]?.price,
          OpenDate: dbOpenDate || prevState[STATE_KEY]?.OpenDate,
          EndDate: dbEndDate || prevState[STATE_KEY]?.EndDate,
          discription: dbDiscription || prevState[STATE_KEY]?.discription,
        }
      }));
    }
  }, [resolvedUser, setState, STATE_KEY]);

  useEffect(()=>{
    console.log(state);
  },[state])

   

  const handleChange = (id, value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: {
        ...prevState[STATE_KEY],
        [id]: value
      }
    }));
  };



  const handleIVenderSave = async () => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vendor/save-vendor', 
       { 
          method: 'POST',
           headers: {
              'Content-Type': 'application/json',
                 },
                body : JSON.stringify(state.Vendor)  
        });
      if (response.ok) {
              // Handle success
           console.log('Profile updated successfully');
          }
      else {
           // Handle errors
            console.error('Failed to update profile');
}
}
      catch (error) {
       console.error('Error updating profile:', error);
            }
}



  if (status === "loading" ) {
    return <LoadingSpinner />;
  }
  else if( dbloading){
    return <MongoSpinner/>
  }

  return (
    <LazyMotion features={features}>
    <form onSubmit={handleIVenderSave} style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2>{`שלום ${session?.user?.name}`}</h2>
      <h3>{`הרשם כנותן שירות משק`}</h3>

      <InputElement
        type={"text"}
        text={"שם העסק"}
        id={"BussniseName"}
        contextType={"Vendor"}
        value={state[STATE_KEY].BussniseName}
        onChange={handleChange}
        required={true}
      />

      <InputElement
        type={"number"}
        text={"מחיר"}
        id={"price"}
        contextType={"Vendor"}
        value={state[STATE_KEY].price}
        onChange={handleChange}
        min="0.00" 
        max="300.00"
        required={true}
      />

      <TextArea 
          id={"discription"}
          text={"תיאור"} 
          value={state[STATE_KEY].discription}
          onChange={handleChange}
          
          placeholder={discriptionPlaceholder}

      />

      <Calinder
        id={"OpenDate"}
        text={"זמין מ"}
        title="sdasdsa"
        value={state[STATE_KEY].OpenDate}
        onChange={handleChange}
        required
      />

      <Calinder
        id={"EndDate"}
        text={"סיום"}
        value={state[STATE_KEY].EndDate}
        onChange={handleChange}
      />

      <m.button
       type="submit"
       style={{
              height: "70px", 
              marginTop: "15px",
              width: '40%',
              border: "1px solid",
              borderRadius: "15px",
              background: "#fff",
              fontSize: "20px",
              color: "#fff",
              cursor: "pointer",
              textAlign: "center",
              color:Colors.b,
              boxShadow:`3px 3px 3px 3px ${Colors.c}`
          }}
          whileHover={{
            boxShadow :`3px 3px 3px  inset`,
          }}
       >רישום</m.button> 
    </form>
    </LazyMotion>
  );
};

export default VendorForm;
