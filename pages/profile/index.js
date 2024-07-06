import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from 'Context/Context';
import ProfileLayout from '@layouts/ProfileLayout';
import ProfileHeader from '@pages/profile/ProfileHeder';
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner'
import ProfileInfo from '@pages/profile/ProfileInfo';


// Dynamic imports


const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state] = useContext(UserContext);

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
