import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context';
import InputElemnt from '../../components/input-elemnt';
import Calinder from '../../components/calendar/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextArea from '../../components/text-area/index';
import Colors from '../../lib/colors';
import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features";
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';
import TSwitch from '../../components/t-switch/switch';
import useUser from '../../lib/hooks/useUser';

const headelinStyle = { textAlign: "center" };


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
      <form style={{ marginBottom: "150px" }} onSubmit={handleSubmit}>
        <h2 style={headelinStyle}> {`שלום ${session?.user?.name} `}</h2>
        <h3 style={headelinStyle}>{`הזמן משק בית `}</h3>

        <div >  <h4>פרטי קשר</h4>
          <InputElemnt
            id={"phone"}
            text={"טלפון"}
            required={true}
            STATE_KEY={STATE_KEY}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].phone}
          />
        </div>

        <div > <h4>פרטי הזמנה</h4>
          <Calinder
            text={"תאירך ושעה"}
            id={"ResurveDate"}
            placeholder={""}
            STATE_KEY={STATE_KEY}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].ResurveDate}
          />
          <TextArea
            id={"JobDescription"}
            value={state[STATE_KEY].JobDescription}
            PropsOnChange={handleChange}
            resize={false}
            text={" תיאור "}
            placeholder={""}
          />           
        </div>


        <div >   <h4>פרטי בית</h4>
          <InputElemnt
            text={"כתובת"}
            type={"location"}
            id={"addres"}
            STATE_KEY={STATE_KEY}
            value={state[STATE_KEY].addres}
            PropsOnChange={handleChange}
          />
          <InputElemnt
            type={"number"}
            text={"מספר חדרים "}
            STATE_KEY={"Customer"}
            id="ApartmentRoomsSize"
            required
            value={state[STATE_KEY].ApartmentRoomsSize}
            PropsOnChange={handleChange}
          />
          <InputElemnt
            type={"number"}
            text={"מספר מקלחות"}
            STATE_KEY={STATE_KEY}
            id={"NumberOfBathRooms"}
            PropsOnChange={handleChange}
            value={state[STATE_KEY].NumberOfBathRooms}
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
