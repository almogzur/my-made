import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { m, LazyMotion } from 'framer-motion';
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";
import Colors from "@/lib/colors";

// Dynamic import for LazyMotion and loadFeatures

// Function to dynamically load features
const loadFeatures = () =>
  import("@/lib/features").then(res => res.default);

function ProfileControls() {
  const { data: session } = useSession();

  return (
    !session ?
    <LazyMotion  features={loadFeatures}>
    <div
      style={{
        position:"absolute",
        left:"0px",
        height:'inherit',

        }}>
      <m.button
          style={{
            height:'inherit',
            border:"none",
            background:Colors.c
                }}
            animate={{x:[-70,0]}}
            transition={{ duration:2 }}
            whileHover={{
                 borderRadius:"15px",
                 background: Colors.d,
 
          }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
      
      >
        הרשמה או התחברות
      </m.button>
      </div>
    </LazyMotion>
      :
    <LazyMotion features={loadFeatures}>
        <div
        
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "150px",
            display: "flex",
            flexDirection: "row",

          }}
        >

          <m.div
            style={{borderRadius:"15px",height:"60px",display:'flex',
            flexDirection:'row'|'column',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',}}
            animate={{ rotate: [-30,0] }}
            transition={{ type: "spring", duration: 5 }}
            whileHover={{ rotate: 360 , background:Colors.d}}
          >
            <Link
              href={"/profile"}
              shallow={true}
            >
              <Image
                src={session.user.image}
                height={50}
                width={50}
                style={{ borderRadius: "15px" }}
                alt="User Profile Link"
              />
            </Link>
          </m.div>

          <m.button
            style={{
              border: "none",
              background: "none",
              width: "inherit",
              height: "inherit",
              color: Colors.d,
            }}
            animate={{ rotate: [30,0] }}
            transition={{ type: "spring", duration: 1 }}
            whileHover={{ rotate: 360}}
            onClick={() => signOut({
              callbackUrl: "/"
            })}
          >
            <FaPowerOff size={40} />
          </m.button>
        </div>
      </LazyMotion>
  );
}

export default ProfileControls;
