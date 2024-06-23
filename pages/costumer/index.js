"use client"

//Costumer Page
//Costumer Page 
//Costumer Page
//Costumer Page
import { useEffect } from "react";
import FooterRwapper from "@/components/Footer/FooterRwapper"
import CustomerForm from "pages/costumer/CustomerForm"
import { useRouter } from "next/router"; 
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import StarRating from "@/components/StarRating/StarRating";

const CostumerPage  = ({})=>{
   
  const router = useRouter()
  const { data: session ,status ,update} = useSession()


  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  return (
   <>
   <FooterRwapper/>
   <CustomerForm/>
    </>
  )
}


export default CostumerPage