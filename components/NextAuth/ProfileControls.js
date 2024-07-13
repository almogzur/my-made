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
    <m.div
      style={{
        position:"absolute",
        left:"0px",
        height:'inherit',
        }}
        animate={{opacity:[0,0.5,1]}}
        transition={{duration:2}}

        >
      <m.button
          style={{
            height:'inherit',
            border:"none",
            background:Colors.c
                }}

            transition={{ duration:1 }}
            whileHover={{
                 borderRadius:"15px",
                 background: Colors.d,
 
          }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
      
      >
        הרשמה או התחברות
      </m.button>
      </m.div>


    </LazyMotion>
      :
    <LazyMotion features={loadFeatures}>
        <m.div
          animate={{opacity:[0,0.5,1]}}
          transition={{duration:2}}
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
            transition={{ type: "spring", duration: 1 }}
            whileHover={{ rotate: 180 , background:Colors.d}}
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
                fetchPriority="auto"
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
            transition={{  duration: 1 }}
            whileHover={{ rotate: 360}}
            onClick={() => signOut({
              callbackUrl: "/"
            })}
          >
            <FaPowerOff size={40} />
          </m.button>
        </m.div>
      </LazyMotion>
  );
}

export default ProfileControls;
