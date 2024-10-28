import Link from "next/link";
import Image from "next/image";
import { m } from 'framer-motion';
import Colors from "../../lib/colors";
import { useSession } from 'next-auth/react'


function ProfileLink() {
    
    const { data: session , status , } = useSession();


    if(!session){
        <h1>No Profile Eroor</h1>
    }

  return (
    <Link
      href={"/profile"} 
    >
      <m.div
        style={{
          borderRadius: "5px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: Colors.d,
          color: Colors.a,
          cursor: 'pointer',
        }}
        transition={{ duration: 1 }}
        whileHover={{ borderRadius: "15px", background: Colors.d, color: Colors.c }}
      >
        
        { 
          <Image
            src={session?.user?.image}
            height={40}
            width={40}
            alt="User Profile Link"
            style={{ borderRadius: "15px" }}
            fetchPriority="auto"
          />
          
          }פרופיל
        
      </m.div>
    </Link>
  );
}

export default ProfileLink;
