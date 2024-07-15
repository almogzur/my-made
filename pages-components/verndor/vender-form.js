import React, { useContext, useEffect, useState } from "react";
import { StateContext } from '../../context'
import { useSession } from "next-auth/react";
import LoadingSpinner from '../../components/spining-loader/spining-loader'
import InputElement from '../../components/input-elemnt'
import Calinder from '../../components/calendar'
import TextArea from '../../components/text-area'
import Colors from '../../lib/colors'
import useGetUser from '../../lib/hooks/use-get-user'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import { m, LazyMotion } from 'framer-motion';
import f from '../../lib/features'

const descriptionPlaceholder = 
` המחיר המבוקש הוא עבור ... 
 מלל חופשי`;

const headelinStyle = { textAlign: "center" };



const VendorForm = ({ STATE_KEY }) => {
  const [state, setState] = useContext(StateContext);
  const { data: session, status } = useSession();
  const { UserData, dbloading, profileError } = useGetUser(session?.user?.email);
  const [resolvedUser, setResolvedUser] = useState(null);




  useEffect(() => {
     console.log(STATE_KEY,state[STATE_KEY]);
    if (UserData) {
      setResolvedUser(UserData);
    }
  }, [UserData,state,STATE_KEY]);


  // Update STATE FROM DB 
  useEffect(() => {
    if (resolvedUser) {
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          ...prevState[STATE_KEY],
          BussniseName: resolvedUser.state[STATE_KEY].BussniseName || "",
          price: resolvedUser.state[STATE_KEY].price || "",
          description: resolvedUser.state[STATE_KEY].description || "",
          OpenDate: resolvedUser.state[STATE_KEY].OpenDate ,
          EndDate: resolvedUser.state[STATE_KEY].EndDate 
        }
      }));
    }
  }, [resolvedUser, STATE_KEY, setState]);

  const handleChange = (id, value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value}
    }));
  };

  const handleIVenderSave = async (e) => {
    try {
      const response = await fetch('/api/vendor/save-vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY])
      });
      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (dbloading) {
    return <MongoSpinner />;
  }

  return (
    <LazyMotion features={f}>
      <form style={{marginBottom:"150px"}} onSubmit={handleIVenderSave}>
        <h2 style={headelinStyle}>{`שלום ${session?.user?.name}`}</h2>
        <h3 style={headelinStyle}>{`הרשם כנותן שירות משק`}</h3>

        <InputElement
          type={"text"}
          text={"שם העסק"}
          id={"BussniseName"}
          STATE_KEY={STATE_KEY}
          value={state[STATE_KEY]?.BussniseName || ""}
          onChange={handleChange}
          required={true}
        />

        <InputElement
          type={"number"}
          text={"מחיר"}
          id={"price"}
          contextType={"Vendor"}
          value={state[STATE_KEY]?.price || ""}
          onChange={handleChange}
          min="0.00"
          max="300.00"
          required={true}
        />

        <TextArea
          id={"description"}
          text={"תיאור"}
          value={state[STATE_KEY]?.description || ""}
          onChange={handleChange}
          placeholder={descriptionPlaceholder}
        />

        <Calinder
          id={"OpenDate"}
          text={"מ תאריך "}
          value={state[STATE_KEY]?.OpenDate}
          onChange={handleChange}
          required
          STATE_KEY={STATE_KEY}
          
        />

        <Calinder
          id={"EndDate"}
          text={"עד תאריך"}
          value={state[STATE_KEY].EndDate}
          onChange={handleChange}
          STATE_KEY={STATE_KEY}

        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={{
              height: "70px",
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
          >{resolvedUser?"עדכון":"רישום"}
          </m.button>
        </div>
      </form>
    </LazyMotion>
  );
};

export default VendorForm;
