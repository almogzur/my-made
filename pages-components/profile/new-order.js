import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Colors from '../../lib/colors.js';
import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features.js";
import useUser from '../../lib/hooks/useUser.js';
import { Textarea ,Input } from '@chakra-ui/react';
import { Field } from "../../components/ui/field"
import LoadingSpinner from '../../components/my-spinner/loading-spinner.js';

/////

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { he } from 'date-fns/locale/he';
registerLocale('he', he )
/////

////
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@chakra-ui/react"

const israelRegions = [
  { value: 'צפון' },
  { value: 'חיפה' },
  { value: 'ירושלים' },
  { value: 'תל אביב' },
  { value: 'מרכז' },
  { value: 'באר שבע' },
  { value: 'דרום' },
  { value: 'אילת' },  
];
////


const STATE_KEY = "Order";

 const Style = {
   Wrapper:{
   }, 
   submitBtn:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
     width:"150px",
     height:"60px",   

         backgroundColor: Colors.d,
         color: '#fff',
         border: 'none',
         borderRadius: '5px',
         cursor: 'pointer',
         fontSize: '1rem',
         fontWeight: 'bold',
         margin:"15px",
   }

  
 }

const NewOrder = ({ orderId, newOrder }) => {

  const { data: session, status } = useSession();
  const [ state, setState ] = useContext(StateContext);
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const [startDate, setStartDate] = useState("");
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

  const hendelCaLchange =  (value)=>{
      
  }

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
        style={{
          display:"flex",
          flexDirection:"column",
          background:"#fff",
          

    }}
      >
      <h3>הזמן משק בית</h3>


  
     <Field  label="שם"  >
      <Input  variant="subtle" type="text"  placeholder={session.user.name} />
     </Field>


     <Field label="טלפון" >
      <Input variant="subtle"   type='tel'  id="orderPhone"  required onChange={handleChange} />
     </Field>

      
      <DatePicker
            placeholderText= "תאריך ושעה "
            id="ResurveDate"
            locale={he}
            required
            withPortal
            selected={startDate} 
            onChange={ (date) =>{ 
                setStartDate(date);
                hendelCaLchange(date);
            }}
          
             closeOnScroll
             showYearDropdown
             showMonthDropdown
             showTimeSelect
             showFullMonthYearPicker
             showPreviousMonths
             showPopperArrow
             isClearable
              className={`orders-calindre`}
              clearButtonClassName="orders-calinder-btn"
              timeIntervals={15}
              dateFormat="PPp"        
              
      />

 
        
      <Field label="תיאור הבקשה בהרכבה " >
          <Textarea resize={"none"} variant={"subtle"} value={state[STATE_KEY].JobDescription} id='JobDescription'  onChange={handleChange} />
      </Field>

      <NativeSelectRoot
            onChange={handleChange}
            placeholder="אזור"
            required
            variant="subtle"
            size={"צג"}
            id='city'    
          >

          <NativeSelectField>
              <option value="">אזור</option>
                  {israelRegions.map((obj,i)=>{
                  const city = obj.value
  
                  return <option   id={city}  key={` ${city} ${i}`} value={city}>{city}</option>
             })}   
            </NativeSelectField>
      </NativeSelectRoot>

    

       <Field label="כתובת" >
         <Input type='text' variant={"subtle"} id='addres'  onChange={handleChange} required  width={"100%"}/>
       </Field>


       <Field label="מספר חדרים " >
        <Input variant={"subtle"}  required    type='number'   width={"100%"}     onChange={handleChange}  id="ApartmentRoomsNumber"/>
       </Field>

  

       <Field label="מספר מקלחות" >
          <Input variant={"subtle"} type="number" id="NumberOfBaths"    onChange={handleChange} />
       </Field>



      <Field  label="גודל הדירה במטרים" >
        <Input variant={"subtle"} type="number"  id="ApartmentSize" onChange={handleChange} />
      </Field>

      <Field label="מחיר שעתי" >
        <Input variant={"subtle"}  id="orderPrice"  type="number" onChange={handleChange} />
      </Field>



      <LazyMotion features={f}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={Style.submitBtn}
            whileHover={{ boxShadow: `3px 3px 3px inset` ,background: Colors.c }}
          >
          {orderId? "עדכן ":" שלח הזמנה "}  
        </m.button>
        </div>
      </LazyMotion>
    </form>
  );
};

export default NewOrder;
