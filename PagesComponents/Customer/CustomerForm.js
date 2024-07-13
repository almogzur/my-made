import React,{useState,useEffect,useContext} from 'react'
import { StateContext } from '@Context/Context'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import Calendar from "@/components/Calinder/Calinder"
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



    const CustomerFrom = ({})=>{
        const { data: session ,status ,update} = useSession()

        const [state,setState]=useContext(StateContext)

       
       useEffect(()=>{
    
        if (status === "unauthenticated" ) {
         router.push("/")
    
     }
    },[])
/* Form Filds    
location,
    aparment-size , 
    ditale-expation , 
    avalbilati,
    numberOfSowers , 
    cliningetirealsexloded ,

    extra {
        windows , 
        stars , 
        wherhowse ,
        driveway,
        yards,
 */

        return (
            
        <form 
            style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',
            }}

        >

            <h2> {`שלום ${session?.user?.name} `}</h2>
            <h3>{`הזמן משק בית `}</h3>

         
            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
                stateKey={"Customer"}
                id="Phone" 
                required
                value={''}
                onChange={()=>{}}
            />
           
            <InputElemnt
                text={"מספר מקלחות"}
                stateKey={"isCustomer"}
            />
             <Calendar
                text={"תאירך ושעה"}
            />


            <InputElemnt
                text={"כתובת"}
                type={"location"}
                contextType={"Customer"}
                id={"location"}
                required
                stateKey={""}
                value={""}
                onChange={""}
            />
      {/** User Data Save to db  */}

         <button>
         
        </button>
            </form>
 
            
        )

     }

     export default CustomerFrom




