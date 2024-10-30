import { useEffect, useContext , useState } from "react";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";
import NewOrder from "../../pages-components/customer/new-order";
import Head from "next/head";
import MongoSpinner from "../../components/mongo-spinner/mongo-spinner";
import CustomerOrderList from '../../pages-components/customer/customer-order-list'
import UiDialog from '../../components/dialog/ui-dialog'
import Colors from "../../lib/colors";
import { IoMdAddCircle } from "react-icons/io";
import OldOrderList from "../../pages-components/customer/customer-old-order-list";

const CostumerPage = () => {



  const router = useRouter();
   const { data: session, status } = useSession()


   const Style =  {
      Wrapper:{
        
        marginTop:"20px",
        margingBottom:"20px",
        height:"40px",
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
   
      },
      CloseDialogButton:{
        position:"absolute",
        top:"45px",
        left:"5px",
        border:"none",
        background:Colors.b,
        color:Colors.d,
        width:"40px",
        height:"40px",
        borderRadius:"10px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        
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
         <title>לקוח</title>
      </Head>
 
          <CustomerOrderList/>
             <UiDialog
                 CloseDialogButtonStyle={Style.CloseDialogButton}
                 wrapperStyle={Style.Wrapper}
                 Icon={<IoMdAddCircle  size="2em"/>}
             >
               <NewOrder newOrder={true}/>  
            </UiDialog> 
           <OldOrderList/>

    </>
  );
};

export default CostumerPage;
