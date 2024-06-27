// Vendore Page
// Vendore Page
// Vendore Page
// Vendore Page


import React,{useEffect} from "react";
import ProfileLayout from "@layouts/ProfileLayout";
import VenderForm from "@pages/profile/vendor/VenderForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";

function Vender() {

  const { data: session ,status ,update} = useSession()
  const router = useRouter()



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
         <VenderForm/>
      </ProfileLayout> 
        </>
     );
}

export default Vender;