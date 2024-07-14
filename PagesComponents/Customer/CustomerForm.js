import React,{useState,useEffect,useContext} from 'react'
import { StateContext } from '@Context/Context'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import Calendar from "@/components/Calinder/Calinder"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import TextArea from '@/components/TextArea/TextArea'
import useGetUser from '@/lib/hooks/useGetUser'
import RangeElemnt from '@/components/RangeElemnt/RangeElemnt'
import Colors from '@/lib/colors'
import {m,LazyMotion} from 'framer-motion'
import f from "@/lib/features"

    const CustomerFrom = ({STATE_KEY})=>{
        const { data: session ,status ,update} = useSession()

        const [state,setState]=useContext(StateContext)
        const { UserData, dbloading, profileError } = useGetUser(session?.user?.email);
        const [resolvedUser, setResolvedUser] = useState(null);
      
    // No Session
       useEffect(()=>{
        console.log(STATE_KEY,state[STATE_KEY]);

        if (status === "unauthenticated" ) {
         router.push("/")
    
     }
    },[])

  // Boolean for Secssesful User Featch

  useEffect(() => {
    if (UserData) {
      setResolvedUser(UserData);
    }
  }, [UserData,state]);



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



        return (
            <LazyMotion features={f}>
        <form    onSubmit={()=>{}}     >

            <h2> {`שלום ${session?.user?.name} `}</h2>
            <h3>{`הזמן משק בית `}</h3>

         
            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
                STATE_KEY={"Customer"}
                id="phone" 
                required
                value={''}
                onChange={handleChange}
            />
           
            <InputElemnt
                text={"מספר מקלחות"}
                STATE_KEY={STATE_KEY}
                id={"NumberOfBathRooms"}
            />
            <InputElemnt
                id={"phone"}
                text={"טלפון"}
                required={true}
                STATE_KEY={STATE_KEY}
            />
            <InputElemnt
                id={"addphone"}
                text={"טלפון נוסף"}
                STATE_KEY={STATE_KEY}

            />
             <Calendar
                text={"תאירך ושעה"}
                id={"ResurveDate"}
                placeholder={""}
                STATE_KEY={STATE_KEY}
                onChange={handleChange}
            />

            <RangeElemnt
                label={"מחיר מ"}
                STATE_KEY={STATE_KEY}

            />
               <RangeElemnt
                label={"עד"}
                STATE_KEY={STATE_KEY}

            />

            <TextArea
                  id={"JobDescription"} 
                  value={state[STATE_KEY]["JobDescription"]}
                  onChange={handleChange}
                  resize={false}
                  text={"תיאור "}
                  placeholder={""}
            />

            <InputElemnt
                text={"כתובת"}
                type={"location"}
                contextType={"Customer"}
                id={"location"}
                required
                stateKey={""}
                value={""}
                onChange={handleChange}
            />
      {/** User Data Save to db  */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <m.button
            type="submit"
            style={{
              height: "70px",
              width: '150px',
              border: "1px solid",
              borderRadius: "15px",
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
            
        )

     }

     export default CustomerFrom




