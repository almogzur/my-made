import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context.js';
import Calinder from '../../components/calendar/cal.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Colors from '../../lib/colors.js';
import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features.js";
import useUser from '../../lib/hooks/useUser.js';
import RegionSelect from '../../components/select-city/select.js';
import { Textarea ,Input } from '@chakra-ui/react';
import { Field } from "../../components/ui/field"
import LoadingSpinner from '../../components/my-spinner/loading-spinner.js';
const STATE_KEY = "Order";

 const Style = {
   Wrapper:{
    margin:"0px",
    padding:"0px",
    
   },
 
   SubmitStyle : {
    height: "60px",
    width: '150px',
    border: "1px solid",
    borderRadius: "3px",
    background: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    textAlign: "center",
    color: Colors.text,
    boxShadow: `3px 3px 3px 3px ${Colors.c}`,
  }
  
 }

const NewOrder = ({ orderId, newOrder }) => {

  const { data: session, status } = useSession();
  const [ state, setState ] = useContext(StateContext);
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const router = useRouter();


  // No Session redirect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  });

  // Fetch the order if orderId is provided
  useEffect(() => {
   
   
    if (orderId) { // Fetch order only if it's not a new order
      const existingOrder = user?.Orders?.find(order => order.orderId === orderId);
      if (existingOrder) {
        setState(prevState => ({
          ...prevState,
          [STATE_KEY]: { ...existingOrder }
        }));
      }


    }
 

  // Component Will UnMounte Clear the State Oreder
    return ()=> setState(prevState => ({
      ...prevState,
       [STATE_KEY]: []
    }));

  }, [orderId, user, newOrder]);


  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;


    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };
  const createNewOrder = async () => {
    try {
      const response = await fetch('/api/customer/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY]),
      });
  
      if (response.ok) {
        console.log('New order created successfully');
      } else {
        alert('Failed to create new order');
      }
    } catch (error) {
      console.error('Failed to create new order', error);
    }
  };
  const updateExistingOrder = async () => {
    try {
      const response = await fetch('/api/customer/edit-order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state[STATE_KEY], orderId }),
      });
  
      if (response.ok) {
        console.log('Order updated successfully');
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };  


  if (isLoading || status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <form 
        onSubmit={orderId? updateExistingOrder: createNewOrder}
        style={Style.Wrapper}
      >
      <h3>הזמן משק בית</h3>


      <label>
      <strong>שם</strong>
      <input 
        type="text" disabled 
        style={Style.InputStyle}
        placeholder={session.user.name}
        // cant be change and hrd coded in back end 
      />
      
    </label>

      <label>
        <strong>טלפון</strong>
        <input
          name='orderPhone'
          type='tel'
          id="orderPhone"
          required
          onChange={handleChange}
          style={Style.InputStyle}
        />
      </label>

      <Calinder
        text="תאירך ושעה"
        id="ResurveDate"
        STATE_KEY={STATE_KEY}
      />

 
        <Field label="תיאור הבקשה בהרכבה " >
          <Textarea resize={"none"} variant={"subtle"} value={state[STATE_KEY].JobDescription} id='JobDescription'  onChange={handleChange} />
        </Field>

      <RegionSelect
           propsId={"city"}
           PropsPlaceholder={"אזור מגורים"}
      />

    

      <Field label="כתובת" >
         <Input type='text' variant={"subtle"} id='addres'  onChange={handleChange} required  width={"100%"}/>
      </Field>


      <Field label="מספר חדרים " >
        <Input   required    type='number'   width={"100%"}     onChange={handleChange}  id="ApartmentRoomsNumber"/>
      </Field>

      <label><strong>מספר מקלחות</strong>
        <input
          type="number"
          id="NumberOfBaths"
          name='NumberOfBaths'
          onChange={handleChange}
          style={Style.InputStyle}
        />
      </label>
      <label><strong>גודל הדירה במטרים</strong>
        <input
          name='ApartmentSize'
          type="number"
          id="ApartmentSize"
          onChange={handleChange}
          style={Style.InputStyle}
        />
      </label>

      <label><strong>מחיר שעתי</strong>
        <input
          name='orderPrice'
          id="orderPrice"
          type="number"
          style={Style.InputStyle}
          onChange={handleChange}
        />
      </label>

 



      <LazyMotion features={f}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={Style.SubmitStyle}
            whileHover={{ boxShadow: `3px 3px 3px inset` ,background: Colors.d ,color:Colors.text}}
          >
        {orderId? "עדכן ":" שלח הזמנה "}  
        </m.button>
        </div>
      </LazyMotion>
    </form>
  );
};

export default NewOrder;
