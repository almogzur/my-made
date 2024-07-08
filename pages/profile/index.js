/// ProfilePage



import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner';

import LoadingSpinner from '@/components/Loader/LoadingSpinner';

const ProfileLayout = dynamic(() => import('@layouts/ProfileLayout'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});
const ProfileHeader = dynamic(() => import('PagesComponents/Profile/ProfileHeder'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});
const ProfileInfo = dynamic(() => import('@PagesComponents/Profile/ProfileInfo'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});


const ProfilePage = ({  }) => {
  const router = useRouter();
  const { data: session ,status ,update} = useSession()

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner/>;
  }

  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileInfo />
    </ProfileLayout>
  );
};

export default ProfilePage;
