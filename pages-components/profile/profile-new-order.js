import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useUser from '../../lib/hooks/useUser.js';
import { Textarea, Input, HStack, Container, Flex, Text, Button } from '@chakra-ui/react';
import { Field } from "../../components/ui/field";
import { WindowWidthContext } from '../../context.js';
import { israelRegions } from '../../app-data.js';
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { he } from 'date-fns/locale/he';
registerLocale('he', he);
import {
  NativeSelectField as Option,
  NativeSelectRoot as Select,
} from "@chakra-ui/react";

import Colors from '../../lib/colors.js';

function addMonths(date, months) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

const INITIAL_ORDER_STATE = {
  phone: '',
  date: null,
  hour: '',
  city: '',
  address: '',
  rooms: '',
  jobDescription: '',
  price: ''
};

const NewOrder = ({ id, newOrder, setPerent , submitBtnStyle }) => {
  const { data: session, status } = useSession();
  const [state, setState] = useState(INITIAL_ORDER_STATE);
  const { user, isLoading, isError, updateUser } = useUser(session?.user?.email);
  const { xs } = useContext(WindowWidthContext);
  const [orderStatus, setOrderStatus] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (id && user) {
      const ComboOrders = [...(user?.Profile_Orders || []), ...(user?.Profile_Active_Orders || [])];
      const existingOrder = ComboOrders.find(order => order._id === id);
      if (existingOrder) {
        setState(existingOrder);
        setOrderStatus(existingOrder.status); // Store status to use in handleSubmit
      }
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleDateChange = (date) => setState((prevState) => ({ ...prevState, date }));

  const handleSelect = (e) => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, city: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Choose URL based on the order status
    const url = id
      ? orderStatus === "Open"
        ? '/api/profile/edit-new-order'
        : '/api/profile/edit-in-process-order'
      : '/api/profile/save-order';

    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        updateUser();
        setTimeout(() => setPerent(false), 1000);
        console.log(`Order ${id ? 'updated' : 'created'} successfully`);
      } else {
        alert(`Failed to ${id ? 'update' : 'create'} order`);
      }
    } catch (error) {
      console.error(`Failed to ${id ? 'update' : 'create'} order`, error);
    }
  };

  return (
    <form style={{ fontWeight: "bold" , direction:"rtl" }} onSubmit={handleSubmit}>
      <Text p={!xs ? 1 : 3} fontWeight={"bolder"} fontSize={"larger"}>
        {session?.user?.name}
      </Text>
      <Text p={!xs ? 1 : 3} fontWeight={"bolder"} fontSize={"larger"}>
        {id ? "עדכון פרטי הזמנה" : "הזן את הפרטים הנדרים לרשום הזמנה"}
      </Text>


      <HStack  >

       <Field mt={2} label="טלפון" required  htmlFor='phone'>
        <Input
          variant="subtle"
          type='tel'
          id="phone"
          required
          pattern="0[0-9]{2}[0-9]{3}[0-9]{4}|0[0-9]{2}[0-9]{3}[0-9]{3}"
          value={state.phone}
          onChange={handleChange}
          lang='he'
          
        />
       </Field>

       <Field label="תאריך " required paddingTop={"10px"}>
        <DatePicker
          locale={he}
          selected={state.date}
          onChange={handleDateChange}
          timeIntervals={30}
          dateFormat="PP"
          required
          className='order-cal'
          minDate={new Date()}
          maxDate={addMonths(new Date(), 6)}
        />
      </Field>
  
     </HStack>
    
   
    
      <HStack  >
        <Field label="שעת הגעה" required>
          <Input
            type='time'
            variant="subtle"
            required
            id='hour'
            value={state.hour}
            onChange={handleChange}
          />
        </Field>
        <Field pt={1} label="מספר חדרים" required>
        <Input
          variant="subtle"
          type='number'
          id="rooms"
          value={state.rooms}
          onChange={handleChange}
          required
          width="100%"
        />
      </Field>
     
      </HStack>


      <HStack>
      {!id && (
        <Field label="אזורֿ / עיר" paddingTop={"10px"} required>
          <Select
            required
            variant="subtle"
            id='city'
            value={state.city}
            onChange={handleSelect}
            paddingBottom={"10px"}
          >
      <Option required>
              <option>{state.city ?? null}</option>
              {israelRegions.map((obj, i) => (
                <option key={i} value={obj.value}>{obj.value}</option>
              ))}
            </Option>
      
          </Select>
        </Field>
      )}
      <Field pt={1} label="כתובת" required>
        <Input
          type='text'
          variant="subtle"
          id='address'
          value={state.address}
          onChange={handleChange}
          required
          width="100%"
        />
      </Field>
      </HStack>


      <Field pt={1} label=" בקשות לנותן השירות">
        <Textarea
        rows={1}
          resize="none"
          variant="subtle"
          id='jobDescription'
          value={state.jobDescription}
          onChange={handleChange}
        />
      </Field>

      <Field pt={1} label="שעתון" required>
        <Input
            
          variant="subtle"
          required
          id="price"
          type="number"
          value={state.price}
          onChange={handleChange}
          max={300}
          min={0}
        />
      </Field>

      <Flex justifyContent="center" mt="15px">
        <Button {...submitBtnStyle} type="submit" >{id ? "עדכן" : "שלח הזמנה"}</Button>
      </Flex>
    </form>
  );
};

export default NewOrder;
