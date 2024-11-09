import React, { useState, useEffect, useContext ,forwardRef } from 'react';
import { StateContext } from '../../context.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useUser from '../../lib/hooks/useUser.js';
import { Textarea ,Input, HStack, Container , Flex, Text, Button ,Stack , For , createListCollection } from '@chakra-ui/react';
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
import Colors from '../../lib/colors.js';


////


const STATE_KEY = "Order";



const NewOrder = ({ id, newOrder }) => {

  const { data: session, status } = useSession();
  const [ state, setState ] = useContext(StateContext);
  const { user, isLoading, isError ,updateUser } = useUser(session?.user?.email);
  
  const router = useRouter();


  // No Session redirect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  });

  // Fetch the order if orderId is provided
  useEffect(() => {
    
   
    if (id) { //  order only if it's not a new order
      const existingOrder = user?.Profile_Orders?.find(order => order._id === id);
        
      if (existingOrder) {
        setState(prevState => ({
          ...prevState,
          [STATE_KEY]: { ...existingOrder  }
        }));
      }


    }
 

  // Component Will UnMounte Clear the State Oreder
    return ()=> setState(prevState => ({
      ...prevState,
       [STATE_KEY]: []
    }));

  }, [id, user, newOrder]);


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
    console.log(value);
    
    
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], date: value }
    }));
  }


  const handleSelect= (e)=>{
    const   value  = e.target.value
    const id = "city"
        setState((prevState)=>({ ...prevState,
          [STATE_KEY]:{...prevState[STATE_KEY], [id]:value}
        }))    
  }

  const createNewOrder = async (e) => {
        e.preventDefault()

    try {

      const response = await fetch('/api/profile/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY]),
      });
  
      if (response.ok) {
        updateUser()

        console.log('New order created successfully');
      }
    } catch (error) {
      console.error('Failed to create new order', error);

    }
  };


  //  need to change to Close order 
  const updateExistingOrder = async (e) => {

    try {
      const response = await fetch('/api/profile/edit-order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state[STATE_KEY], id }),
      });
  
      if (response.ok) {
        updateUser()
        console.log('Order updated successfully');
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };  


  return (
    
    <form  onSubmit={id? updateExistingOrder: createNewOrder}>
   <Container  bg={'gray.200'} color={Colors.d}   > 
      <Text  fontWeight={"bolder"} fontSize={"larger"} >{session?.user?.name}</Text>
      <Text fontWeight={"bolder"} fontSize={"larger"}>הזמן משק בית</Text>
      


  
     <Field label="טלפון" required >
      <Input
         variant="subtle"
         type='tel'
         id="phone" 
         required 
         value={state[STATE_KEY].phone}
         onChange={handleChange} 
       />
     </Field>

        
        <Flex justifyContent={"center"}   >

          <DatePicker      
            placeholderText= "תאריך ושעה "
            locale={he}
            selected={state[STATE_KEY].date}
            onChange={  (date) => hendelCaLchange(date)} 
            timeIntervals={30}
            dateFormat="PP"     
            required        
            className='order-cal'

            
                 
     >
  
     </DatePicker>

       </Flex>
    
      <HStack gap="10" width="full">

          <Field label="משעה"  required>

             <Input 
             type='time' 
             placeholder="12:00" 
             variant="subtle" 
             required
             id='hour'
             value={state[STATE_KEY].hour}
             onChange={handleChange}
             />

          </Field>

          <Field label="עד שעה " required>

             <Input 
               type='time' 
               placeholder="00:00" 
               variant="subtle" 
               id="tooHour"
               required
               value={state[STATE_KEY].tooHour}
               onChange={handleChange}

               />

           </Field>

      </HStack>
      
        
  

        <Select
            placeholder="אזור"
           required
            variant="subtle"
            id='city'
            value={state[STATE_KEY].city}
            onChange={handleSelect}
            paddingTop={"20px"}
            
          >

          <Option  required>
                   <option value="">{ state[STATE_KEY].city ?? "אזורֿ / עיר" }</option>
                  {israelRegions.map((obj,i)=>{
                  const city = obj.value
  
                  return <option required  id={city}  key={`  ${i}`} value={city} >{city}</option>
             })}   
            </Option>
      </Select> 
    

       <Field  pt={1} label="כתובת" required >
         <Input 
            type='text' 
            variant={"subtle"} 
            id='address'
            value={state[STATE_KEY].address}
            onChange={handleChange}
            required 
            width={"100%"}      
            />
       </Field>


       <Field pt={1} label="מספר חדרים " >
        <Input 
            variant={"subtle"}
            required    
            type='number'   
            width={"100%"}     
            value={state[STATE_KEY].rooms}
            onChange={handleChange}  
            id="rooms"  
            />
       </Field>


       <Field pt={1} label="מספר מקלחות" >
          <Input 
              variant={"subtle"} 
              type="number" 
              id="baths"  
              value={state[STATE_KEY].baths} 
              onChange={handleChange}
                />
       </Field>

       <Field pt={1} label="תיאור הבקשה  " >
          <Textarea 
              resize={"none"} 
              variant={"subtle"} 
              value={state[STATE_KEY].jobDescription} 
              onChange={handleChange} 
              id='description'  
            />
      </Field>




      <Field pt={1} label=" שעתון" required  >
        <Input 
            variant={"subtle"}  
            required
            id="price"  
            type="number"
            value={state[STATE_KEY].price}
            onChange={handleChange} 
            max={300}
            min={0}

            />
      </Field>



        <Flex  justifyContent={"center"} marginTop={"15px"}  >
          {/* ther is no way to control date required  */} 
         <Button colorPalette={"blue"} variant={"subtle"} type="submit">{id? "עדכן ":" שלח הזמנה "}</Button> 
          {/* /////////////// */}
        </Flex>
    </Container>
    </form>
  );
};

export default NewOrder;

