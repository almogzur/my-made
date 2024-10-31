
import { useSession } from 'next-auth/react'
import {useState, useContext} from 'react'
import { StateContext } from '../../context'
import VendorDisplay from './vendor-display'
import VendorForm from './vender-form'
import useUser from '../../lib/hooks/useUser'

import LoadingSpinner from '../../components/my-spinner/loading-spinner'


const VendorInfo = () => {

  const STATE_KEY = "Vendor";
  // Data
    const { data: session ,status ,update} = useSession()
    const [state, setState] = useContext(StateContext);
    const { user , isLoading , isError } = useUser(session?.user?.email)


   
  
  // updates to DOM
    const [edit ,setEdit] = useState(false)
    
 
    if (status === 'loading' || isLoading ) {
        return <LoadingSpinner/>
    }
  
    else if ( user?.[STATE_KEY]?.isVendor && !edit ) {
             return  <VendorDisplay setEdit={setEdit} user={user?.[STATE_KEY]}/>
    }
  
    return    <VendorForm setEdit={setEdit} />
     
  };
  

  
  export default VendorInfo;
  

