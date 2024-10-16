import { useSession, signIn, signOut } from "next-auth/react";
import useUser from "../../lib/hooks/useUser";
import Link from "next/link";
import { m, LazyMotion } from 'framer-motion';
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";
import Colors from "../../lib/colors";
import f from '../../lib/features';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { position } from "@chakra-ui/react";


const Styles = {

  unOuthWrapper:{
    width:"100%",
    display:'flex',
    justifyContent:'center',
    position:"absolute",
    bottom:"250px"
  },
  unOuthBtn:{
    width: "150px",
    height: '60px',
    border: "none",
    background: Colors.c,
    borderRadius: "6px",
    
    
  },
 


}





function ProfileControls( {children,inHomePage}) {

  const { data: session , status } = useSession();

  if ( !session && status !=="loading") {
    return (
      <LazyMotion features={f}>
      <div style={Styles.unOuthWrapper} >
        <m.button
          style={Styles.unOuthBtn}
          transition={{ duration: 1 }}
          whileHover={{borderRadius: "15px",background: Colors.d,}}
          animate={{ opacity: [0, 0.5, 1] }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
        >
          <strong>כניסה</strong>
        </m.button>
      </div>
      </LazyMotion>
    );
  }

   // ther is no direct pathing to Home with an active sesstion  
   // BUT it you do manage to go ther this will render 


   else if ( inHomePage  && session  ) {
    return (
      <>
        <Link href={"/profile"} passHref>
          <m.div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
              borderRadius: "5px",
              height: "40px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: Colors.d,
              padding: '10px',
              color: Colors.a,
              cursor: 'pointer',
            }}
            transition={{ duration: 1 }}
            whileHover={{
              borderRadius: "15px",
              background: Colors.d,
              color: Colors.c,
            }}
          >פרופיל
          </m.div>
          
        </Link>
        
   

        <m.button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            border: "none",
            background: Colors.d,
            borderRadius: "5px",
            width: "60px",
            height: "60px",
            color: Colors.a,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          transition={{ duration: 1 }}
          whileHover={{
            rotate: 360,
            background: Colors.d,
            color: Colors.c,
          }}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <FaPowerOff size={30} />
        </m.button>
      </>
    );

  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  

  else if(session) {
    return (
      <LazyMotion features={f}>
        <m.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 2 }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            width:"100%",
            
          }}
        >
          <m.div
         
          animate={ {rotate:360}}
            style={{
              marginTop:"3px",
              borderRadius: "5px",
              height: "50px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              background: Colors.b,
              width:"70px",
             
            }}
          transition={{ type: "spring", duration: 1 }}
          >
            <Link href={"/profile"} shallow={true}>
              <Image
                src={session?.user?.image}
                height={40}
                width={40}
                style={{ borderRadius: "15px" }}
                alt="User Profile Link"
                fetchPriority="auto"
              />
            </Link>
 
          </m.div>
          {children? children :null}
 
          <m.button
            style={{
       
              marginTop:"7px",
              border: "none",
              background: "none",
              height: "inherit",
              color: Colors.a,
              width:"70px"
            }}
              transition={{ duration: 1 }}
              whileHover={{ rotate: 360 }}
              onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FaPowerOff size={40} />
          </m.button>

        </m.div>
      </LazyMotion>
    );
  }else {
    return null
  }
}

export default ProfileControls;
