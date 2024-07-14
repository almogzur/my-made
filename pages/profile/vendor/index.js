////Vendor
////Vendor
////Vendor
////Vendor
////Vendor

import React, { useContext,useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileLayout from "@layouts/ProfileLayout";
import VendorForm from 'pages-components/verndor/VenderForm'
import LoadingSpinner from "@/components/spining-loader/SpiningLoader";




const VenderPage = () => {

  const STATE_KEY = "Vendor";
   
  const { data: session, status } = useSession();

  const router = useRouter()


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);




  if (status === 'loading') {
    return <LoadingSpinner />;
  }

 return (
      <ProfileLayout>
        <VendorForm 
          STATE_KEY={STATE_KEY}
        />
      </ProfileLayout>
    );





};

export default VenderPage;
