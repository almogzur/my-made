import React,{useState,useEffect,useContext} from 'react'
import { StateContext } from '../../context/context'
import InputElemnt from '../../components/input-elemnt/input-elemnt'
import Calinder from '../../components/calendar/calendar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import TextArea from '../../components/text-area/text-area'
import useGetUser from '../../lib/hooks/use-get-user'
import RangeElemnt from '../../components/range-elemnt/range-elemnt'
import Colors from '../../lib/colors'
import {m,LazyMotion} from 'framer-motion'
import f from "../../lib/features"
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'

const headelinStyle = { textAlign: "center" };


    const CustomerFrom = ({STATE_KEY})=>{

        const { data: session ,status ,update} = useSession()
        const [state,setState]=useContext(StateContext)
        const { UserData, dbloading, profileError } = useGetUser(session?.user?.email);
        const [resolvedUser, setResolvedUser] = useState(null);
        const router = useRouter()
        
    // No Session
       useEffect(()=>{
        console.log(STATE_KEY,state[STATE_KEY]);

        if (status === "unauthenticated" ) {
         router.push("/")
    
     }
    },[state])

  // if Secssesful User Featch
  useEffect(() => {
    if (UserData) {
      setResolvedUser(UserData);
    }
  }, [UserData,state]);
// if dbUser set it as State
  useEffect(() => {
    if (resolvedUser) {
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          ...prevState[STATE_KEY],
          phone: resolvedUser.state[STATE_KEY].phone ,
          addphone:resolvedUser.state[STATE_KEY].addphone,
          ApartmentRoomsSize: resolvedUser.state[STATE_KEY].ApartmentRoomsSize ,
          NumberOfBathRooms: resolvedUser.state[STATE_KEY].NumberOfBathRooms ,
          ResurveDate: resolvedUser.state[STATE_KEY].ResurveDate ,
          PriceRange:resolvedUser.state[STATE_KEY].PriceRange,
          JobDescription: resolvedUser.state[STATE_KEY].JobDescription ,
          addres: resolvedUser.state[STATE_KEY].addres,

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
  const handleSubmit = async (e) => {
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
        console.log(result.message);
        // Optionally, update the state or notify the user
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update customer information', error);
    }
  };
  



  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (dbloading) {
    return <MongoSpinner />;
  }



    return (
    <LazyMotion features={f}>
        <form    onSubmit={handleSubmit}     >

            <h2 style={headelinStyle}> {`שלום ${session?.user?.name} `}</h2>
            <h3 style={headelinStyle}>{`הזמן משק בית `}</h3>

         
            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
                STATE_KEY={"Customer"}
                id="ApartmentRoomsSize" 
                required
                value={state[STATE_KEY].ApartmentRoomsSize}
                onChange={handleChange}
            />
           
            <InputElemnt
            type={"number"}
                text={"מספר מקלחות"}
                STATE_KEY={STATE_KEY}
                id={"NumberOfBathRooms"}
                onChange={handleChange}
                value={state[STATE_KEY].NumberOfBathRooms}


            />
            <InputElemnt
                id={"phone"}
                text={"טלפון"}
                required={true}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}
                value={state[STATE_KEY].phone}

            />
            <InputElemnt
                id={"addphone"}
                text={"טלפון נוסף"}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}
                value={state[STATE_KEY].addphone}


            />
             <Calinder
                text={"תאירך ושעה"}
                id={"ResurveDate"}
                placeholder={""}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}
                value={state[STATE_KEY].ResurveDate}
            />

            <RangeElemnt
                label={"מחיר מ"}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}
                
            />
               <RangeElemnt
                label={"עד"}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}

            />

            <TextArea
                  id={"JobDescription"} 
                  value={state[STATE_KEY].JobDescription}
                  onChange={handleChange}
                  resize={false}
                  text={"תיאור "}
                  placeholder={""}
            />

            <InputElemnt
                text={"כתובת"}
                type={"location"}
                contextType={"Customer"}
                id={"addres"}
                STATE_KEY={STATE_KEY}
                value={state[STATE_KEY].addres}
                onChange={handleChange}
            />
      {/** User Data Save to db  */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={{
              height: "70px",
              width: '200px',
              border: "1px solid",
              borderRadius: "15px",
              background: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              textAlign: "center",
              color: Colors.b,
              boxShadow: `3px 3px 3px 3px ${Colors.c}`,
              marginBottom:"150px"
            }}
            whileHover={{
              boxShadow: `3px 3px 3px inset`,
            }}
          >{resolvedUser?"עדכון":"רישום"}
          </m.button>
        </div>
            </form>
            </LazyMotion>
            
        )

     }

     export default CustomerFrom




