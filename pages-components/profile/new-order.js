import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../context.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Colors from '../../lib/colors.js';
import { motion } from 'framer-motion';
import useUser from '../../lib/hooks/useUser.js';
import { Textarea ,Input, HStack, Container , Flex, Text} from '@chakra-ui/react';
import { Field  } from "../../components/ui/field"

/////
import { israelRegions } from '../../app-data.js';
import DatePicker  from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { he } from 'date-fns/locale/he';
registerLocale('he', he )
/////

////
import {
  NativeSelectField  as Option,
  NativeSelectRoot as Select,
} from "@chakra-ui/react"


////


const STATE_KEY = "Order";

 const Style = {

   submitBtn:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
     width:"150px",
     height:"60px",   

         background: "gray",
         
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
  const { user, isLoading, isError ,mutate } = useUser(session?.user?.email);
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
      // hendler cant get the values from Select && Calender events ,



    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  const hendelCaLchange =  (value)=>{
    
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], ResurveDate: value }
    }));
  }

  const handleSelect= (e)=>{
    const   value  = e.target.value
    const id = "city"
        setState((prevState)=>({ ...prevState,
          [STATE_KEY]:{...prevState[STATE_KEY], [id]:value}
        }))    
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
        
        mutate()
        console.log('New order created successfully');
      } else {
        alert('Failed to create new order');
      }
    } catch (error) {
      console.error('Failed to create new order', error);
    }
  };



  //  need to change to Close order 
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
        mutate()
        console.log('Order updated successfully');
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };  




  return (
    
    <form   onSubmit={orderId? updateExistingOrder: createNewOrder}>
   <Container  color={Colors.c}   >
      <Text fontWeight={"bolder"} fontSize={"larger"}>הזמן משק בית</Text>


  
     <Field paddingTop="15px"  label="שם מלא" htmlFor={'name'}   >
      <Input  
           variant="subtle" 
           type="text" 
           id='name'
           value={state[STATE_KEY].name} 
           onChange={handleChange}
           />
     </Field>


     <Field label="טלפון" >
      <Input
         variant="subtle"
         type='tel'
         id="orderPhone" 
         required 
         value={state[STATE_KEY].orderPhone}
         onChange={handleChange} 
       />
     </Field>


        <Flex justifyContent={"center"}  >

          <DatePicker      
            placeholderText= "תאריך ושעה "
            locale={he}
            required
            selected={startDate} 
            onChange={ (date) =>{ 
                hendelCaLchange(date);
            }}
             inline
             showMonthDropdown
             show
             timeIntervals={30}
             dateFormat="PPp"                  
           />

       </Flex>
    
      <HStack gap="10" width="full">

          <Field label="משעה" required>

             <Input 
             type='time' 
             placeholder="12:00" 
             variant="subtle" 
             id='FromH'
             value={state[STATE_KEY].FromH}
             onChange={handleChange}
             />

          </Field>

          <Field label="עד שעה " required>

             <Input 
               type='time' 
               placeholder="00:00" 
               variant="subtle" 
               id="ToH"
               value={state[STATE_KEY].ToH}
               onChange={handleChange}

               />

           </Field>

      </HStack>
      

 
        
      <Field label="תיאור הבקשה  " >
          <Textarea 
              resize={"none"} 
              variant={"subtle"} 
              value={state[STATE_KEY].JobDescription} 
              onChange={handleChange} 
              id='JobDescription'  
            />
      </Field>

      <Select
            key={"new-order"}
            placeholder="אזור"
            required
            variant="subtle"
            id='city'
            value={state[STATE_KEY].city}
            onChange={handleSelect}
            paddingTop={"20px"}
            
          >

          <Option>
              <option >אזור</option>
                  {israelRegions.map((obj,i)=>{
                  const city = obj.value
  
                  return <option  id={city}  key={`  ${i}`} value={city} >{city}</option>
             })}   
            </Option>
      </Select>

    

       <Field label="כתובת" >
         <Input 
            type='text' 
            variant={"subtle"} 
            id='addres'
            value={state[STATE_KEY].addres}
            onChange={handleChange}
            required 
            width={"100%"}      
            />
       </Field>


       <Field label="מספר חדרים " >
        <Input 
            variant={"subtle"}
            required    
            type='number'   
            width={"100%"}     
            value={state[STATE_KEY].ApartmentRoomsNumber}
            onChange={handleChange}  
            id="ApartmentRoomsNumber"  
            />
       </Field>


       <Field label="מספר מקלחות" >
          <Input 
              variant={"subtle"} 
              type="number" 
              id="NumberOfBaths"  
              value={state[STATE_KEY].NumberOfBaths} 
              onChange={handleChange}
                />
       </Field>



      <Field  label="גודל הדירה במטרים" >
        <Input 
            variant={"subtle"} 
            type="number"  
            id="ApartmentSize" 
            value={state[STATE_KEY].ApartmentSize}
            onChange={handleChange} 

            />
      </Field>

      <Field label="מחיר שעתי"  >
        <Input 
            variant={"subtle"}  
            id="orderPrice"  
            type="number"
            value={state[STATE_KEY].orderPrice}
            onChange={handleChange} 
            max={300}
            min={0}

            />
      </Field>



        <Flex  justifyContent={"center"} marginTop={"15px"}  >
          <motion.button
            type="submit"
            style={Style.submitBtn}
            whileHover={{ boxShadow: `3px 3px 3px inset` ,background: "black" ,color:"#fff" }}
          >
          {orderId? "עדכן ":" שלח הזמנה "}  
        </motion.button>
        </Flex>
    </Container>
    </form>
  );
};

export default NewOrder;
