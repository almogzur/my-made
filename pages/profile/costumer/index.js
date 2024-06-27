"use client"

//Costumer Page
//Costumer Page 
//Costumer Page
//Costumer Page
import { useEffect } from "react";
import CustomerForm from "pages/profile/costumer/CustomerForm"
import { useRouter } from "next/router"; 
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import ProfileLayout from "@layouts/ProfileLayout";

const CostumerPage  = ({})=>{
   
  const router = useRouter()
  const { data: session ,status ,update} = useSession()



  useEffect(()=>{
    
    if (status === "unauthenticated" ) {
     router.push("/")

 }
})
  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  return (
   <>
  <ProfileLayout>
    <CustomerForm/>
  </ProfileLayout>
    </>
  )
}


export default CostumerPage