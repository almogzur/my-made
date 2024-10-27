////Vendor
////Vendor
////Vendor
////Vendor
////Vendor

import React, { useContext,useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileLayout from '../../../layouts/profile-layout'
import Head from "next/head";
import VendorWrapper from "../../../pages-components/verndor/vendor-wrapper";


const VenderPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter()
 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


 return (
  <>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>רישום משק</title>
        
      </Head>
     <ProfileLayout>
        <VendorWrapper/>
      </ProfileLayout>
      </>
    );





};

export default VenderPage;
