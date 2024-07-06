import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Dynamic imports
const ProfileLayout = dynamic(() => import("@layouts/ProfileLayout"), {
  ssr: false,
  loading: () => <div>Loading Profile Layout...</div>,
});

const Form = dynamic(() => import("@pages/profile/vendor/Form"), {
  ssr: false,
  loading: () => <div>Loading Form...</div>,
});

const LoadingSpinner = dynamic(() => import("@/components/Loader/LoadingSpinner"), {
  ssr: false,
  loading: () => <div>Loading Spinner...</div>,
});

const Vender = () => {
  const PAGE_STATE = "isVendor";
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <ProfileLayout>
      <Form PAGE_STATE={PAGE_STATE} />
    </ProfileLayout>
  );
};

export default Vender;
