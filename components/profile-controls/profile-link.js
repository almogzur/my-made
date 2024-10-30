import Link from "next/link";
import Image from "next/image";
import { m } from 'framer-motion';
import Colors from "../../lib/colors";
import { useSession } from 'next-auth/react'




const ProfileLink =()=> {
    
    const { data: session , status , } = useSession();

  return (
    <Link
      href={"/profile"} 
    >
      <m.div
        style={{
          borderRadius: "5px",
          
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: "150px",  
          height: '4em',
          border: `2px solid ${Colors.c}`,
          borderRadius: "6px",
          color:"#fff"
        }}
        transition={{ duration: 1 }}
        whileHover={{ borderRadius: "15px", background: Colors.d, color: Colors.c }}
      >
        
        { 
          <Image
            src={session?.user?.image}
            height={60}
            width={60}
            alt="User Profile Link"
            style={{ borderRadius: "6px" }}
            fetchPriority="auto"
          />
          
          }פרופיל
        
      </m.div>
    </Link>
  );
}

export default ProfileLink;
