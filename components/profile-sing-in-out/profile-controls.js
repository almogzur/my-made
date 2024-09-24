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
import CostumeLink from "../costume-link/costume-link";
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProfileControls() {
  const { data: session , status } = useSession();
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const router = useRouter();
  const { pathname } = router;


  useEffect(() => {
   // console.log(pathname);
  }, [pathname]);


  if ( !session  ) {

    // no Session
    return (
      <LazyMotion features={f}>
        <m.button
          style={{
            width: "150px",
            height: '60px',
            border: "none",
            background: Colors.c,
            borderRadius: "6px",
          }}
          transition={{ duration: 1 }}
          whileHover={{
            borderRadius: "15px",
            background: Colors.d,
          }}
          animate={{ opacity: [0, 0.5, 1] }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
        >
          <strong>כניסה</strong>
        </m.button>
      </LazyMotion>
    );
  }

   // pathName
  else if ( pathname === "/"  ) {
    return (
      <>
        <Link href={"/profile"} passHref>
          <m.div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
              borderRadius: "5px",
              height: "60px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: Colors.c,
              padding: '10px',
              color: Colors.d,
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
            background: Colors.c,
            borderRadius: "5px",
            width: "60px",
            height: "60px",
            color: Colors.d,
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
  

  else {
    return (
      <LazyMotion features={f}>
        <m.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 2 }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            width:"100%"
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
              background: Colors.d,
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

          {/* {  Object.entries(user.Vendore)?  // this will render only if yser is vendor 
             <CostumeLink
                text={"לוח"}
                href={"/board"}  
                divStyle={{}}
          >
           <FontAwesomeIcon size="1x" color={Colors.d} icon={faClipboard}/>
             </CostumeLink>
             :
             null
           } */}
          <m.button
            style={{
       
              marginTop:"7px",
              border: "none",
              background: "none",
              height: "inherit",
              color: Colors.d,
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
  }
}

export default ProfileControls;
