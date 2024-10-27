import { useSession } from "next-auth/react"
import {m, LazyMotion} from 'framer-motion'
import Image from 'next/image';
import defulteUserImg from '../../public/User.jpg';
import ColorsH1 from '../../components/gradient-headline/index';
import Colors from '../../lib/colors';
import f from "../../lib/features"

const ProfileHeader = ({UserData}) => {

//const {} = UserData
const { data: session ,status ,update} = useSession()



 return (
   <LazyMotion features={f}>
      <div
         style={{
           padding:"0px",
           width:"100%",
           margin:"0px",
           height:"150px",
           border:"none",    
           background: 'rgb(25,29,136)',
           background: `linear-gradient(
             -119deg, 
             ${Colors.b} , 
             ${Colors.d} ,
             ${Colors.a}        
           )
           `,
           boxShadow: '0 4px 8px #404040'
                }}
       >


         <ColorsH1
           text={session?.user?.email?.toUpperCase()}
           color1={"black"}
           color2={Colors.d}
           angleDeg={"-217deg"}
           style={{   
           position:"absolute",
            top:"120px",
            right:"10px",
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
            >
            <Image
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
