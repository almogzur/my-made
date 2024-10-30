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
            height:"35em",
           margin:"0px",
          
           border:"none",    

           boxShadow: '0 4px 8px #404040'
                }}
       >


         <ColorsH1
           text={session?.user?.email?.toUpperCase()}
           color1={"black"}
           color2={Colors.c}
           angleDeg={"-217deg"}
           style={{   
           position:"absolute",
            top:"120px",
            right:"10px",
              }}
          >
         </ColorsH1>
         



      </div>
    </LazyMotion>
    );
};

export default ProfileHeader;
