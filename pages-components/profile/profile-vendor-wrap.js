
import { useSession } from 'next-auth/react'
import {useState, useContext , useEffect} from 'react'
import { StateContext } from '../../context'
import VendorDisplay from './profile-is-vendor-display'
import VendorForm from './profile--vender-sing-in'
import useUser from '../../lib/hooks/useUser'
import LoadingSpinner from '../../components/my-spinner/loading-spinner'


const VendorWrap = () => {

  const STATE_KEY = "Vendor";
  // Data



    const { data: session ,status ,update} = useSession()
    const [state, setState] = useContext(StateContext);
    const { user , isLoading , isError , updateUser} = useUser(session?.user?.email)
    const [edit ,setEdit] = useState(false)

    const Vendor = user?.[STATE_KEY]?.isVendor  


    useEffect(()=>{
      updateUser() 

    },[]) //  revaidate data  

    if (status === 'loading' || isLoading ) {
             return <LoadingSpinner/>
     }
  
    else if ( !edit && Vendor) {
             return  <VendorDisplay edit setEdit={setEdit} user={user?.[STATE_KEY]} />
    }
  
             return   <VendorForm  setEdit={setEdit} />
     
  };
  

  
  export default VendorWrap;
  
