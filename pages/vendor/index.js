
import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../pages-components/navigation'
import useUser from '../../lib/hooks/useUser'
import VendorSingIn from '../../pages-components/vendor/vendor-sing-in'
import VendorInfo from '../../pages-components/vendor/vendor-info'


const VendorPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);

  const [edit ,setEdit] = useState(false)

  const Vendor = user?.Vendor?.isVendor  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


    if (status === 'loading') {

     return <h1 style={{textAlign:'center'}}>Loading...</h1>
   }
    return <>
            <Navigation/>
             {Vendor && !edit ?  
                    <VendorInfo edit setEdit={setEdit}  />
                     :
                    <VendorSingIn  setEdit={setEdit} /> 
                    }
        </>

 

}

export default VendorPage