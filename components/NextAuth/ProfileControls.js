import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { m, LazyMotion } from 'framer-motion';
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";
import dynamic from 'next/dynamic';

// Dynamic import for LazyMotion and loadFeatures
const LazyMotionWithFeatures = dynamic(() => import('framer-motion').then(({ m, LazyMotion }) => ({ default: LazyMotion, m })), {
  ssr: false, // Disable server-side rendering if not needed
  loading: () => <div>Loading...</div>, // Optional loading component
});

// Function to dynamically load features
const loadFeatures = () =>
  import("@/lib/features").then(res => res.default);

function ProfileControls() {
  const { data: session } = useSession();

  return (
    !session ?
      <button
        onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
        className="signIn"
      >
        הרשמה או התחברות
      </button>
      :
      <LazyMotionWithFeatures features={loadFeatures}>
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "150px",
            display: "flex",
            flexDirection: "row"
          }}
        >

          <m.div
            animate={{ rotate: 360 }}
            transition={{ type: "spring", duration: 5 }}
            whileHover={{ rotate: 30 }}
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
              color: "#fff",
            }}
            animate={{ rotate: 360 }}
            transition={{ type: "spring", duration: 5 }}
            whileHover={{ rotate: 35 }}
            onClick={() => signOut({
              callbackUrl: "/"
            })}
          >
            <FaPowerOff size={45} />
          </m.button>
        </div>
      </LazyMotionWithFeatures>
  );
}

export default ProfileControls;
