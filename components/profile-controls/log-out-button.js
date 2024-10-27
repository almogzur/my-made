import { signOut } from "next-auth/react";
import { m } from 'framer-motion';
import { FaPowerOff } from "react-icons/fa";
import Colors from "../../lib/colors";

function LogoutButton() {
  return (
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
      whileHover={{ rotate: 360, background: Colors.d, color: Colors.c }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <FaPowerOff size={30} />
    </m.button>
  );
}

export default LogoutButton;
