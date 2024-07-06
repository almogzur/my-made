///  PofilePage
///  PofilePage
///  PofilePage
///  PofilePage
///  PofilePage
///  PofilePage


import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner';
import { UserContext } from 'Context/Context';
import useUpdateDbUserState from '@/lib/hooks/useUpdateDbUserState';

// Dynamic imports with SSR and loading component
const ProfileLayout = dynamic(() => import('@layouts/ProfileLayout'), {
  loading: () => <MongoSpinner />,
  ssr: true, 
});
const ProfileHeader = dynamic(() => import('@pages/profile/ProfileHeder'), {
  loading: () => <MongoSpinner />, 
  ssr: true, 
});
const ProfileInfo = dynamic(() => import('@pages/profile/ProfileInfo'), {
  loading: () => <MongoSpinner />, 
  ssr: true,
});



const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state] = useContext(UserContext);
  const {bdUser,bdLoading,dberr} = useUpdateDbUserState(
    "/api/savestatetouserdb",
    state
  )



  // Prevent slug navigation
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === 'loading') {
    return <MongoSpinner />;
  }

  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileInfo />
    </ProfileLayout>
  );
};

export default ProfilePage;
