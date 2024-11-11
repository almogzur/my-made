import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { StateContext } from '../../context.js';
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

const STATE_KEY = "Order";
const INITIAL_ORDER_STATE = {
  phone: '',
  date: null,
  hour: '',
  tooHour: '',
  city: '',
  address: '',
  rooms: '',
  jobDescription: '',
  price: ''
};

const NewOrder = ({ id, newOrder, setPerent }) => {
  const { data: session, status } = useSession();
  const [state, setState] = useContext(StateContext);
  const { user, isLoading, isError, updateUser } = useUser(session?.user?.email);
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WindowWidthContext);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: INITIAL_ORDER_STATE
    }));

    if (id && user) {
      const ActiveOrders = user?.Profile_Active_Orders || [];
      const OpenOrders = user?.Profile_Orders || [];
      const ComboOrders = OpenOrders.concat(ActiveOrders);
      const existingOrder = ComboOrders.find(order => order._id === id);

      if (existingOrder) {
        setState(prevState => ({
          ...prevState,
          [STATE_KEY]: existingOrder
        }));
      }
    }

    return () => setState(prevState => ({
      ...prevState,
      [STATE_KEY]: INITIAL_ORDER_STATE
    }));
  }, [id, user, newOrder, setState]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  const hendelCaLchange = (value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], date: value }
    }));
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    const id = "city";
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

  const createNewOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY]),
      });

      if (response.ok) {
        updateUser();
        setTimeout(() => {
          setPerent(false);
        }, 1000);
        console.log('New order created successfully');
      }
    } catch (error) {
      console.error('Failed to create new order', error);
      alert(error);
    }
  };

  const updateExistingOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile/edit-order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state[STATE_KEY] }),
      });

      if (response.ok) {
        updateUser();
        console.log('Order updated successfully');
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  return (
    <form style={{ fontWeight: "bold" }} onSubmit={id ? updateExistingOrder : createNewOrder}>
      <Text p={!xs ? 1 : 3} fontWeight={"bolder"} fontSize={"larger"}>{session?.user?.name}</Text>
      <Text p={!xs ? 1 : 3} fontWeight={"bolder"} fontSize={"larger"}>{id ? "עדכון פרטי הזמנה " : "הזן את הפרטים הנדרים לרשום הזמנה "}</Text>

      <Field mt={2} label="טלפון" required>
        <Input
          variant="subtle"
          type='tel'
          id="phone"
          required
          value={state[STATE_KEY]?.phone ?? INITIAL_ORDER_STATE.phone}
          onChange={handleChange}
        />
      </Field>

      <Field label={"תאריך ושעה"} required paddingTop={"10px"}>
        <DatePicker
          locale={he}
          selected={state[STATE_KEY]?.date ?? INITIAL_ORDER_STATE.date}
          onChange={hendelCaLchange}
          timeIntervals={30}
          dateFormat="PP"
          required
          className='order-cal'
          minDate={new Date()}
          maxDate={addMonths(new Date(), 6)}
        />
      </Field>

      <HStack gap="10" width="full">
        <Field label="משעה" required>
          <Input
            type='time'
            placeholder="12:00"
            variant="subtle"
            required
            id='hour'
            value={state[STATE_KEY]?.hour ?? INITIAL_ORDER_STATE.hour}
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
            value={state[STATE_KEY]?.tooHour ?? INITIAL_ORDER_STATE.tooHour}
            onChange={handleChange}
          />
        </Field>
      </HStack>

      {id ? null : (
        <Field label="אזורֿ / עיר" paddingTop={"10px"} required>
          <Select
            required
            variant="subtle"
            id='city'
            value={state[STATE_KEY]?.city ?? INITIAL_ORDER_STATE.city}
            onChange={handleSelect}
            paddingBottom={"10px"}
          >
            <Option required>
              <option>{state[STATE_KEY]?.city ?? null}</option>
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
          variant={"subtle"}
          id='address'
          value={state[STATE_KEY]?.address ?? INITIAL_ORDER_STATE.address}
          onChange={handleChange}
          required
          width={"100%"}
        />
      </Field>

      <Field pt={1} required label="מספר חדרים ">
        <Input
          variant={"subtle"}
          required
          type='number'
          width={"100%"}
          value={state[STATE_KEY]?.rooms ?? INITIAL_ORDER_STATE.rooms}
          onChange={handleChange}
          id="rooms"
        />
      </Field>

      <Field pt={1} label="תיאור הבקשה  ">
        <Textarea
          resize={"none"}
          variant={"subtle"}
          value={state[STATE_KEY]?.jobDescription ?? INITIAL_ORDER_STATE.jobDescription}
          onChange={handleChange}
          id='description'
        />
      </Field>

      <Field pt={1} label=" שעתון" required>
        <Input
          variant={"subtle"}
          required
          id="price"
          type="number"
          value={state[STATE_KEY]?.price ?? INITIAL_ORDER_STATE.price}
          onChange={handleChange}
          max={300}
          min={0}
        />
      </Field>

      <Flex justifyContent={"center"} marginTop={"15px"}>
        <Button type="submit">{id ? "עדכן " : " שלח הזמנה "}</Button>
      </Flex>
    </form>
  );
};

export default NewOrder;
