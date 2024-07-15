import { useEffect, useContext , useState } from "react";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";
import { StateContext } from './../../../context'
import CustomerFrom from "../../../pages-components/customer/customer-form";
import  ProfileLayout from '../../../layouts/profile-layout'
import Head from "next/head";
import MongoSpinner from "../../../components/mongo-spinner/mongo-spinner";

const CostumerPage = () => {
  const STATE_KEY = "Customer";
  const router = useRouter();
   const { data: session, status } = useSession()
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

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
        <CustomerFrom 
         STATE_KEY={STATE_KEY}


        />
      </ProfileLayout>
    </>
  );
};

export default CostumerPage;
