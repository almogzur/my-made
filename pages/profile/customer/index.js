import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { StateContext } from "@Context/Context";
import dynamic from 'next/dynamic';
import CustomerForm from "@PagesComponents/Customer/CustomerForm"
import  ProfileLayout from "@layouts/ProfileLayout"

const LoadingSpinner = dynamic(() => import("@/components/SpiningLoader/SpiningLoader"), {
  ssr: true,
});


const CostumerPage = () => {
  const PAGE_STATE = "isCustomer";
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = useContext(StateContext);

  // Prevent Slug Navigation
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
        <CustomerForm />
      </ProfileLayout>
    </>
  );
};

export default CostumerPage;
