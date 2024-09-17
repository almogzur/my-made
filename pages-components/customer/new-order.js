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


const STATE_KEY = "Order";

const InputStyle = {
  width:"100%",
  padding:"10px",
  marginTop:"10px",
  marginBottom:"10px"
}

const NewOrder = () => {

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
  }, [status]);

  const handleChange = (e) => {
     
   const id = e.target.id
   const value = e.target.value

    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  const handleSubmit = async (e) => {
    console.log(state[STATE_KEY]);
    
   // e.preventDefault();
    try {
      const response = await fetch('/api/customer/save-order', {
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

  const childrenOnChange = ( id,value)=>{
    setState(prevState => ({
      ...prevState,
     [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value },

  }));
  }

  if (status === "loading" ) {
    return <MongoSpinner propsname={STATE_KEY} />;
  }

  return (
      <form style={{   }}
           onSubmit={handleSubmit}
      >
        <h2 > 
          {`שלום ${session?.user?.name} `}
        </h2>

        <h3 > הזמן משק בית </h3>

        <label> <strong>טלפון</strong>
        <br/>
          <input
            type='tel'
            id={"orderPhone"}
            required
            onChange={handleChange}
            value={state[STATE_KEY].orderPhone}
            style={{...InputStyle ,  background : user?.Info?.phone ? "lightgray ": null }}
            
            
          />
          
        </label>
        
   
          <Calinder  text={"תאירך ושעה"}
            id="ResurveDate"
            STATE_KEY={STATE_KEY}
            PropsOnChange={childrenOnChange}
            value={state[STATE_KEY].ResurveDate}
            lableStyle={{background:"red" ,width:"100%",height:"200px"}}
            // Style in Css 
          />


          <TextArea  labelText="תיאור"
            id="JobDescription"
            value={state[STATE_KEY].JobDescription}
            PropsOnChange={childrenOnChange}
            placeholder={" תיאור העבודה בקצרה "}
            StyleLable={{ display:'flex',flexDirection:'column',}}
            StyleTextArea={{}}
          />           


       
         <h4>פרטי בית</h4>

         <label ><strong>כתובת</strong>

          <input
            type="text"
            id="addres"
            value={state[STATE_KEY].addres}
            onChange={handleChange}
            style={InputStyle}
            required

          />
         </label>

         
          <label><strong>מספר חדרים</strong> 
           <input
              type="number"
              id="ApartmentRoomsNumber"
              required
              value={state[STATE_KEY].ApartmentRoomsNumber}
              onChange={handleChange}
              style={InputStyle}
          />
          </label>

          <label><strong>מספר מקלחות </strong> 
         <input
            type="number"
            id="NumberOfBaths"
            onChange={handleChange}
            value={state[STATE_KEY].NumberOfBaths}
            style={InputStyle}

          />
          </label>

          <label><strong>מחיר שעתי</strong>
          
            <input
              id="orderPrice"
              type='number'
              style={InputStyle}
              value={state[STATE_KEY].orderPrice}
              onChange={handleChange}
            />
          </label>

          <label><strong>גודל הדירה במטרים </strong>
            <input
            
              type="text"
              id="ApartmentSize"
              style={InputStyle}
              value={state[STATE_KEY].ApartmentSize}
              onChange={handleChange}
            />



          </label>


      

       
  
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

export default NewOrder;
