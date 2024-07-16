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
import Head from "next/head";
import MongoSpinner from "../../../components/mongo-spinner/mongo-spinner";
import useGetUser from "../../../lib/hooks/use-get-user";



const VenderPage = () => {

  const STATE_KEY = "Vendor";
   
  const { data: session, status } = useSession();
  const { UserData, dbloading, error } = useGetUser(session?.user?.email);
  
  const [ resolvedUser , setResolvedUser] = useState(false)

  const router = useRouter()

 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);



  if (dbloading === "loading") {
    return <MongoSpinner />;
  }

  if (status === 'loading') {
    return <MongoSpinner />;
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
