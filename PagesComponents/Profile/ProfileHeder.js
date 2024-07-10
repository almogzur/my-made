import { useContext } from 'react';
import { useSession } from "next-auth/react"
import {m, LazyMotion} from 'framer-motion'
import Image from 'next/image';
import defulteUserImg from '@public/User.jpg';
import ErrorBoundary from '@/components/ErrorBoundary';
import ColorsH1 from '@/components/gradientH1/ColoreH1';
import Colors from '@/lib/colors';

const loadFeatures = () =>
    import("@/lib/features").then(res => res.default)
  
const ProfileHeader = () => {

    const { data: session, status } = useSession()

 return (
  <ErrorBoundary fallback={<p>Something went wrong</p> } >
   <LazyMotion features={loadFeatures}>
      <m.div
         style={{
           padding:"20px",
           width:"100%",
           height:"200px",
           border:"none",    
           background: 'rgb(25,29,136)',
           background: `linear-gradient(-119deg, 
             ${Colors.a} , 
             ${Colors.c} ,
             #fff
            
          
           )
           `,
           boxShadow: '0 4px 8px #404040'
                }}
       >
         <ColorsH1      
         text={session?.user?.name.toUpperCase()}
         color1={Colors.b}
         color2={Colors.c}
         angleDeg={"-17deg"}
         style={{   
            
            position:"absolute",
            top:"00px",
            right: "10px",

                           }}
            >{}
         </ColorsH1>

         <ColorsH1
         text={session?.user?.email?.toUpperCase()}
         color1={Colors.b}
         color2={Colors.c}
         angleDeg={"-17deg"}
          style={{
            height:"70px",
            marginTop:"50px",
            }}
          >
         </ColorsH1>
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
             animate={{ rotate:360 }}
             transition={{ type: "spring" ,duration:5 }}
            ><Image
                src={session?.user?.image || defulteUserImg}
                height={70}
                width={70}
                alt='profile image'
                style={{borderRadius:"15px"}}
                fetchpriority='auto'
                />
         </m.div>

      </m.div>
    </LazyMotion>
   </ErrorBoundary>
    );
};

export default ProfileHeader;
