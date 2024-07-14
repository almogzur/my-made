import { useEffect, useContext , useState } from "react";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";
import { StateContext } from "@context/context";
import CustomerForm from "pages-components/customer/CustomerForm"
import  ProfileLayout from "@layouts/ProfileLayout"
import LoadingSpinner from "@/components/spining-loader/SpiningLoader";
import useGetUser from "@/lib/hooks/useGetUser";

const CostumerPage = () => {
  const STATE_KEY = "Customer";
  const router = useRouter();
  const { data: session, status } = useSession()
  const [state, setState] = useContext(StateContext)
  const { UserData, dbloading, error } = useGetUser(session?.user?.email);
  
  const [ resolvedUser , setResolvedUser] = useState(false)

  useEffect(()=>{
    // the hook is at loading and without use effect dno know when user is !null 
    // after geting the data set state
        if(UserData!==null){
          setResolvedUser(UserData)
        }
    },[UserData])
  
  

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
      <ProfileLayout>
        <CustomerForm 
         STATE_KEY={STATE_KEY}


        />
      </ProfileLayout>
    </>
  );
};

export default CostumerPage;
