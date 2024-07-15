////Vendor
////Vendor
////Vendor
////Vendor
////Vendor

import React, { useContext,useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileLayout from '../../../layouts/profile-layout'
import VendorForm from '../../../pages-components/verndor/vender-form'
import LoadingSpinner from '../../../components/spining-loader/spining-loader'
import Head from "next/head";




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
  <>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Page Title</title>
        
    </Head>
 
      <ProfileLayout>
        <VendorForm 
          STATE_KEY={STATE_KEY}
        />
      </ProfileLayout>
      </>
    );





};

export default VenderPage;
