import { useEffect, useContext , useState } from "react";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";
import NewOrder from "./new-order"
import Head from "next/head";
import UiDialog from '../../components/dialog/ui-dialog'
import Colors from "../../lib/colors";
import { IoMdAddCircle } from "react-icons/io";
import UserOrders from "./user-orders";

const CostumerPage = () => {



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
         <title>לקוח</title>
      </Head>
           <UserOrders/>
            <UiDialog Icon={<IoMdAddCircle  size="2em"/>}>

                   <NewOrder newOrder={true}/>  

            </UiDialog> 

    </>
  );
};

export default CostumerPage;
