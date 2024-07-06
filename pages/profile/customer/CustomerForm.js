import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '@Context/Context'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import Calendar from "@/components/Calinder/Calinder"
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



    const CustomerFrom = ({})=>{
        const { data: session ,status ,update} = useSession()

        const [state,setState]=useContext(UserContext)

       
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
            
        <form className='customer-form-wrarpper'>

            <h1>הזמנת שירות{session?.user?.name} </h1>

            <InputElemnt
                labelClassName={"  "}
                required 
                inputClassName={""}
                stateKey ={''}
                value ={""}
                onChange ={()=>{}}
                text={"שם הלקוח"}
                type={"text"}
                contextType={"isCustomer"}
                id="FullName" 
            />

            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
                stateKey={"Customer"}
                id="Phone" 
                labelClassName={""}
                required
               inputClassName={""}
                value={''}
                onChange={()=>{}}
            />
           
            <InputElemnt
                text={"מספר מקלחות"}
                stateKey={"isCustomer"}
            />
             <Calendar
                text={"זמין ב"}
            />
            <SelectElemnt
                SelectOptionsArray={["פיפאל","אשראי","ביט","מזומן"]}
                className={"vendor-payment"}
                stateKey={"isCustomer"}
                id={""}
                hedlineText={""}
                value={""}
                onChange={""    }
            />

            <InputElemnt
                text={"מיקום"}
                type={"location"}
                contextType={"Customer"}
                id={"location"}
                labelClassName={""}
                required
                inputClassName={""}
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




