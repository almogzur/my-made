import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState,Suspense} from 'react'
import { useRouter , } from 'next/router'
import ToggleSwitch from '../../components/t-switch/switch'
import { StateContext } from '../../context'
import useUser from '../../lib/hooks/useUser'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'


const VenderActiveOrEdit=({ STATE_KEY })=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const [ state , setState ]= useContext(StateContext)
  
  const { UserData, dbloading, error } = useUser(session?.user?.email);
  
   // on profile load check if use data and set it as with globl accsess 

   const handleChange = (id, value) => {

    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
    }));
  };

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
       <>
        <h4 style={{textAlign:"center" ,margin:"0px"}}> שינוי סטטוס נותן שירות </h4>
        <ToggleSwitch 
            textOn={"זמין"}
            textOff={"לא זמין"}
            PropsOnChange={handleChange}
            id={"isVendor"}
            value={state[STATE_KEY].isVendor}

        />
     </>

) 
}

export default VenderActiveOrEdit