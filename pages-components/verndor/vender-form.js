import React, { useContext, useEffect, useState } from "react";
import { StateContext } from '../../context';
import { useSession } from "next-auth/react";
import InputElement from '../../components/input-elemnt';
import TextArea from '../../components/text-area/t-area';
import Colors from '../../lib/colors'
import { m, LazyMotion } from 'framer-motion';
import f from '../../lib/features';
import useUser from '../../lib/hooks/useUser'
import MongoSpinner from "../../components/mongo-spinner/mongo-spinner";


const headelinStyle = { textAlign: "center" };
const descriptionPlaceholder = 
` המחיר המבוקש הוא לשעה או גלובלי  ... 
 מלל חופשי`;

 const STATE_KEY = "Vendor";


const VendorForm = ({ setEdit }) => {

  const { data: session, status } = useSession();
  const { user , isLoading , isError } = useUser(session?.user?.email)
  const [ state, setState ] = useContext(StateContext);

  //  toogel to render back the form 
  // Update state from db 
  useEffect(() => {
    if (!isLoading && !isError && user) {
      console.log("Vendor form effect - user data:", user);
  
      const businessName = user?.state?.[STATE_KEY]?.BussniseName || '';
      const price = user?.state?.[STATE_KEY]?.price || '';
      const description = user?.state?.[STATE_KEY]?.description || '';
     
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          ...prevState[STATE_KEY],
          BussniseName: businessName,
          price: price,
          description: description,
        }
      }));
    }
  }, [user, setState, isLoading, isError]);
  

  const handleChange = (id, value) => {

    setState(prevState => ({
        ...prevState,
       [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value },

    }));
  };
   // api call set isVendor too true 
  const handleSubmit = async (e) => {
   
 //  e.preventDefault()
   // setEdit(true)
    try {
      const response = await fetch('/api/vendor/save-vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY])
      });
      if (response.status) {
   
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } 
    catch (error) {
      console.error('Error updating profile:', error);
    }
    setEdit(false)

  };



  if (isLoading){
    return <MongoSpinner/>
  }

 return (
      <form 
         style={{ marginBottom: "150px" }}
         onSubmit={handleSubmit}
         >
        <h2 style={headelinStyle}>{`שלום ${session?.user?.name}`}</h2>
        <h3 style={headelinStyle}>{`הרשם כנותן שירות משק`}</h3>

        <InputElement
          type={"text"}
          text={"שם"}
          id={"BussniseName"}
          STATE_KEY={STATE_KEY}
          value={state[STATE_KEY].BussniseName }
          PropsOnChange={handleChange}
          required={true}
        />

        <InputElement
          type={"number"}
          text={"מחיר"}
          id={"price"}
          contextType={"Vendor"}
          value={state[STATE_KEY].price }
          PropsOnChange={handleChange}
          min="0.00"
          max="300.00"
          required={true}
        />

        <TextArea
          id={"description"}
          text={"תיאור"}
          value={state[STATE_KEY].description}
          PropsOnChange={handleChange}
          placeholder={descriptionPlaceholder}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
         <LazyMotion features={f}>
          <m.button
            type="submit"
            style={{
              height: "60px",
              width: '150px',
              border: "1px solid",
              borderRadius: "3px",
              background: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              textAlign: "center",
              color: Colors.b,
              boxShadow: `3px 3px 3px 3px ${Colors.c}`,
            }}
            whileHover={{
              boxShadow: `3px 3px 3px inset`,
            }}
          >
          הרשמה
            </m.button>
          </LazyMotion>
        </div>
      </form>

  );
};

export default VendorForm;
