import { useContext } from 'react';
import { useSession } from "next-auth/react"
import {m, LazyMotion} from 'framer-motion'
import Image from 'next/image';
import defulteUserImg from '@public/User.jpg';

const loadFeatures = () =>
    import("@/lib/features").then(res => res.default)
  
const ProfileHeader = () => {

    const { data: session, status } = useSession()

 return (
  <LazyMotion features={loadFeatures}>
      <m.div
         style={{
           padding:"20px",
           width:"100%",
           height:"200px",
           border:"none",    
           background: 'rgb(25,29,136)',
           background: 'linear-gradient(329deg, rgba(25,29,136,1) 0%, rgba(20,80,163,1) 21%, rgba(255,255,255,1) 100%)',
           boxShadow: '0 4px 8px #404040'
                }}
       >
         <h1      
          style={{   
            position:"absolute",
            top:"00px",
            right: "10px",
               }}
            >{session.user.name.toUpperCase()}
         </h1>
         <h2
          style={{
            height:"70px",
            marginTop:"50px"
            }}
          >{session.user.email}
         </h2>
         <m.div
            style={{
               borderRadius: "15px",
               position:"absolute",
                left:"10px",
                top:"20px"
                  }}
             whileHover={{
                 rotate:30
             }}
             animate={{ rotate:720 }}
             transition={{ type: "spring" ,duration:5 }}
            ><Image
                src={session.user.image || defulteUserImg}
                height={70}
                width={70}
                alt='profile image'
                style={{borderRadius:"15px"}}
                fetchpriority='auto'
                />
         </m.div>
          <m.h1
            style={{ }}
            >פרטים
          </m.h1>
      </m.div>
   </LazyMotion>
    );
};

export default ProfileHeader;
