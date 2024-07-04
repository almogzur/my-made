"use client"

//Costumer Page
//Costumer Page 
//Costumer Page
//Costumer Page
import { useEffect,useContext } from "react";
import CustomerForm from "pages/profile/customer/CustomerForm"
import { useRouter } from "next/router"; 
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import ProfileLayout from "@layouts/ProfileLayout";
import { UserContext } from "@Context/Context";

const CostumerPage  = ({})=>{
  
  const PAGE_STATE="isCustomer"

  const router = useRouter()

  const { data: session ,status ,update} = useSession()

  const [state,setState]=useContext(UserContext)

  // Prevent Slug Navigation     
  useEffect(()=>{
  
    if (status === "unauthenticated"  ) {
     router.push("/")
 }
})

  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  return (
   <>
  <ProfileLayout>
     <CustomerForm
     state={state}
     setState={setState}
     session={session}
      
     />
  </ProfileLayout>
    </>
  )
}


export default CostumerPage