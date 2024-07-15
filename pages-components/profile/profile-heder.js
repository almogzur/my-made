import { useSession } from "next-auth/react"
import {m, LazyMotion} from 'framer-motion'
import Image from 'next/image';
import defulteUserImg from '../../public/User.jpg';
import ColorsH1 from '../../components/gradient-headline/index';
import Colors from '../lib/colors';
import f from "../../lib/features"

const ProfileHeader = () => {

    const { data: session, status } = useSession()

 return (
   <LazyMotion features={f}>
      <div
         style={{
           padding:"0px",
           minWidth:"100%",
           margin:"0px",
           height:"200px",
           border:"none",    
           background: 'rgb(25,29,136)',
           background: `linear-gradient(
             -119deg, 
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
            top:"10px",
            right:"10px",
              }}
            >
         </ColorsH1>

         <ColorsH1
           text={session?.user?.email?.toUpperCase()}
           color1={Colors.b}
           color2={Colors.c}
           angleDeg={"-217deg"}
           style={{   
          position:"absolute",
            top:"150px",
            right:"40px",
              }}
          >
         </ColorsH1>
         <m.div
            style={{
               borderRadius: "15px",
               position:"absolute",
                left:"10px",
                top:"10px"
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

      </div>
    </LazyMotion>
    );
};

export default ProfileHeader;
