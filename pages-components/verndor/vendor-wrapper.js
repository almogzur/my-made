import { useSession } from 'next-auth/react'
import {useEffect,useState, useContext, Suspense} from 'react'
import { StateContext } from '../../context'
import VendorDisplay from '../../pages-components/verndor/vendor-display'
import VendorForm from './vender-form'
import Link from "next/link";
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import useUser from '../../lib/hooks/useUser'


const VendorWrapper=()=>{

  const STATE_KEY = "Vendor";
// Data
  const { data: session ,status ,update} = useSession()
  const [state, setState] = useContext(StateContext);
  const { user , isLoading , isError } = useUser(session?.user?.email)

// updates to DOM
  const [edit ,setEdit] = useState(false)
  const [Vendor, setVendor] = useState(user?.[STATE_KEY]?.isVendor || false);

  useEffect(() => {
    if (user?.[STATE_KEY]?.isVendor) {
      setVendor(user?.[STATE_KEY].isVendor);
    }
  }, [user]);

  if (status === 'loading' || isLoading  ) {
      return <MongoSpinner/>
  }

  else if (!edit && Vendor ) {
           return  <VendorDisplay      
                     phone={
                         user?.Info?.phone ||
                         <Link
                           style={{textDecoration:"none", color:`blue`}} 
                           href="/profile"
                        > לחץ כאן לעדכון טלפון 
                         </Link> 
                         }
                     setEdit={setEdit}
                     STATE_KEY={STATE_KEY}
                     BussniseName={user[STATE_KEY].BussniseName}
                     price={user[STATE_KEY].price}
                     description={user[STATE_KEY].description}
                     isVendor={Vendor}
                   />
  }

  return    <VendorForm
              setEdit={setEdit}
            />
   

}

export default VendorWrapper