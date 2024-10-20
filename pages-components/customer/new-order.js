import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context.js';
import Calinder from '../../components/calendar/cal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextArea from '../../components/text-area/t-area.js';
import Colors from '../../lib/colors.js';
import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features.js";
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner.js';
import useUser from '../../lib/hooks/useUser.js';
import RegionSelect from '../../components/select-city/select.js';

const STATE_KEY = "Order";

const InputStyle = {
  width: "96%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  fontWeight: "bold"

};

const SubmitStyle = {
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

const textAreaStyle ={ resize: "none" ,   fontWeight: "bold" , width:"100%" , borderRadius:"3px"   }

const NewOrder = ({ orderId, newOrder }) => {

  const { data: session, status } = useSession();
  const [state, setState] = useContext(StateContext);
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const router = useRouter();


  // No Session
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
  
  const childrenOnChange = (id, value) => {
      console.log(id,value, "changed");
      

    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  if (isLoading || status === "loading") {
    return <MongoSpinner propsname={STATE_KEY} />;
  }

  return (
    <form onSubmit={orderId? updateExistingOrder: createNewOrder}>
      <h3>הזמן משק בית</h3>


      <label>
      <strong>שם</strong>
      <input 
        type="text" disabled 
        style={InputStyle}
        placeholder={session.user.name}
        // cant be change and hrd coded in back end 
      />
      
    </label>

      <label>
        <strong>טלפון</strong>
        <br />
        <input
          type='tel'
          id="orderPhone"
          required
          onChange={handleChange}
          value={state[STATE_KEY].orderPhone}
          style={InputStyle}
        />
      </label>

      <Calinder
        text="תאירך ושעה"
        id="ResurveDate"
        STATE_KEY={STATE_KEY}
        PropsOnChange={childrenOnChange}
        value={state[STATE_KEY]?.ResurveDate}
      />

      <TextArea
        labelText="תיאור"
        id="JobDescription"
        value={state[STATE_KEY]?.JobDescription}
        PropsOnChange={childrenOnChange}
        placeholder="תיאור העבודה בקצרה"
        StyleTextArea={textAreaStyle}
      />

      <RegionSelect
           value={state[STATE_KEY]?.city}
           propsId={"city"}
           PropsOnChange={childrenOnChange}
           PropsPlaceholder={"אזור מגורים"}
      />

      <label><strong>כתובת</strong>
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

      <label><strong>מספר מקלחות</strong>
        <input
          type="number"
          id="NumberOfBaths"
          value={state[STATE_KEY].NumberOfBaths}
          onChange={handleChange}
          style={InputStyle}
        />
      </label>

      <label><strong>מחיר שעתי</strong>
        <input
          id="orderPrice"
          type="number"
          style={InputStyle}
          value={state[STATE_KEY].orderPrice}
          onChange={handleChange}
        />
      </label>

 



      <LazyMotion features={f}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={SubmitStyle}
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
