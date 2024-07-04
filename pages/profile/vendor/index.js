// Vendore Page
// Vendore Page
// Vendore Page
// Vendore Page


import React,{useContext, useEffect, useState} from "react";
import ProfileLayout from "@layouts/ProfileLayout";
import VenderForm from "@pages/profile/vendor/VenderForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import { UserContext } from "@Context/Context";

function Vender() {

  const PAGE_STATE = "isVendor"

  const { data: session ,status ,update} = useSession()
  const [state,setState]=useContext(UserContext)
  const router = useRouter()


  if (status === 'loading') {
    return <LoadingSpinner/>
  }

    return ( 
        <> 
      <ProfileLayout>
          <VenderForm 
           state={state}
           setState={setState}  
           session={session}
           PAGE_STATE={PAGE_STATE}
           />
      </ProfileLayout> 
        </>
     );
}

export default Vender;