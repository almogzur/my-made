import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context.js';
import Calinder from '../../components/calendar/cal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextArea from  '../../components/text-area/t-area.js'
import Colors from '../../lib/colors.js';
import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features.js";
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner.js';
import useUser from '../../lib/hooks/useUser.js';

const textInputStyle = {
  width:"100%",
  padding:"10px",
  marginTop:"10px",
  marginBottom:"10px"
}

const CustomerFrom = ({ STATE_KEY }) => {

  const { data: session, status, update } = useSession();
  const [ state, setState ] = useContext(StateContext);
  //const { ApartmentRoomsSize , NumberOfBathRooms , ResurveDate, PriceRange , JobDescription , addres } = user?.state
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const router = useRouter();

  // No Session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [state]);

  // if Successful User Fetch

  // if dbUser set it as State
  useEffect(() => {
    if (!isError && !isLoading) {
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          ...prevState[STATE_KEY],
          phone: user?.state?.STATE_KEY?.phone,
          addphone: user?.state?.STATE_KEY?.addphone,
          ApartmentRoomsSize: user?.state?.STATE_KEY?.ApartmentRoomsSize,
          NumberOfBathRooms: user?.state?.STATE_KEY?.NumberOfBathRooms,
          ResurveDate: user?.state?.STATE_KEY?.ResurveDate,
          PriceRange: user?.state?.STATE_KEY?.PriceRange,
          JobDescription: user?.state?.STATE_KEY?.JobDescription,
          addres: user?.state?.STATE_KEY?.addres,
          
        },
      }));
    }
  }, [user, STATE_KEY, setState, isError , isLoading]);

  const handleChange = (id, value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  const handleSubmit = async (e) => {
   // e.preventDefault();
    try {
      const response = await fetch('/api/customer/save-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state[STATE_KEY])
      });
      const result = await response.json();
      if (response.ok) {
        console.log(response);
        
        console.log(result.message);
      } else {
        alert("bad resopnce ")
     }
    } catch (error) {
      console.error('Failed to update customer information', error);
    }
  };

  if (status === "loading" ) {
    return <MongoSpinner />;
  }

  return (
      <form style={{   }}
           onSubmit={handleSubmit}
      >
        <h2 > 
          {`שלום ${session?.user?.name} `}
        </h2>

        <h3 > הזמן משק בית </h3>

        <label>          

        <strong>טלפון</strong>

        <br/>

          <input
            type='tele'
            id={"phone"}
            required={true}
            STATE_KEY={STATE_KEY}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].phone}
            style={textInputStyle}
            
          />
          
        </label>
        
     <br/>
          <Calinder
            text={"תאירך ושעה"}
            id={"ResurveDate"}
            placeholder={""}
            STATE_KEY={STATE_KEY}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].ResurveDate}
            lableStyle={{background:"red" ,width:"100%",height:"200px"}}

            // Style in Css 
          />
          <TextArea
            id={"JobDescription"}
            value={state[STATE_KEY].JobDescription}
            PropsOnChange={handleChange}
            resize={false}
            labelText="תיאור"
            placeholder={""}
            StyleLable={{
              display:'flex',
              flexDirection:'column',
      
               }}
              StyleTextArea={{

              }}
          />           


        <div >  
         <h4>פרטי בית</h4>

         <label>כתובת

          <input
            type={"location"}
            id={"addres"}
            STATE_KEY={STATE_KEY}
            value={state[STATE_KEY].addres}
            PropsOnChange={handleChange}
            style={textInputStyle}

          />
         </label>

         
          <label>

            <input
              type={"number"}
              text={"מספר חדרים "}
              STATE_KEY={"Customer"}
              id="ApartmentRoomsSize"
              required
              value={state[STATE_KEY].ApartmentRoomsSize}
              PropsOnChange={handleChange}
              style={textInputStyle}
          />
          </label>


          <input
            type={"number"}
            text={"מספר מקלחות"}
            STATE_KEY={STATE_KEY}
            id={"NumberOfBathRooms"}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].NumberOfBathRooms}
            style={textInputStyle}

          />
        </div>

       
  
        <LazyMotion features={f}>
         <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
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
            שלח הזמנה
           </m.button>      
         </div>
        </LazyMotion>

      </form>
  );
};

export default CustomerFrom;
