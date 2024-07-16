import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { m, LazyMotion } from 'framer-motion';
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";
import Colors from "../../lib/colors";
import f from '../../lib/features'
import { useEffect } from "react";
import { useRouter } from "next/router";

function ProfileControls() {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const linkDefaultStyle = { textDecoration: "none", color: Colors.d };

  if (!session) {
    return (
      <LazyMotion features={f}>
        
          <m.button
            style={{
              
              width:"150px",
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
  } else if (pathname === "/") {
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
          >
            פרופיל
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
  } else {
    return (
      <LazyMotion features={f}>
        <m.div
          animate={{ opacity: [0, 0.5, 1] }}
          transition={{ duration: 2 }}
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
            style={{
              borderRadius: "5px",
              height: "60px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
            transition={{ type: "spring", duration: 1 }}
          >
            <Link href={"/profile"} shallow={true}>
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
