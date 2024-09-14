import { useEffect, useContext , useState } from "react";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";
import NewOrder from "../../../pages-components/customer/new-order";
import  ProfileLayout from '../../../layouts/profile-layout'
import Head from "next/head";
import MongoSpinner from "../../../components/mongo-spinner/mongo-spinner";
import AppHead from '../../../components/app-head/app-head'
import CustomerOrderList from '../../../pages-components/customer/customer-order-list'
import UiDialog from '../../../components/dialog/ui-dialog'
import Colors from "../../../lib/colors";

const CostumerPage = () => {



  const STATE_KEY = "Customer";
  const router = useRouter();
   const { data: session, status } = useSession()


   const Style =  {
      Wrapper:{
        marginTop:"20px",
        margingBottom:"20px",
        height:"70px",
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
   
      },
      CloseDialogButton:{
        border:"none",
        background:Colors.b,
        color:Colors.d
      },

    }
  
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
    <AppHead/>
      <ProfileLayout>      
        
        <CustomerOrderList/>
        <UiDialog
          buttonText={"הזמנה חדשה "}
          CloseDialogButtonStyle={Style.CloseDialogButton}
          wrapperStyle={Style.Wrapper}
         >
           <NewOrder 
             STATE_KEY={STATE_KEY}
           />
        </UiDialog> 
      </ProfileLayout>

    </>
  );
};

export default CostumerPage;
