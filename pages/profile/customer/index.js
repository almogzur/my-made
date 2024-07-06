import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UserContext } from "@Context/Context";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import dynamic from 'next/dynamic';

// Dynamic import for ProfileLayout
const ProfileLayout = dynamic(() => import("@layouts/ProfileLayout"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable server-side rendering if not needed
});

// Dynamic import for CustomerForm
const CustomerForm = dynamic(() => import("PagesComponents/Customer/CustomerForm"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable server-side rendering if not needed
});

const CostumerPage = () => {
  const PAGE_STATE = "isCustomer";
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = useContext(UserContext);

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
