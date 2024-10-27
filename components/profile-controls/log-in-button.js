import { signIn } from "next-auth/react";
import { m, LazyMotion } from 'framer-motion';
import Colors from "../../lib/colors";
import f from '../../lib/features';

const Styles = {
  unOuthWrapper: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    position: "absolute",
    bottom: "250px"
  },
  unOuthBtn: {
    width: "150px",
    height: '60px',
    border: "none",
    background: Colors.c,
    borderRadius: "6px",
  },
};

function LoginButton() {
  return (
    <LazyMotion features={f}>
      <div style={Styles.unOuthWrapper}>
        <m.button
          style={Styles.unOuthBtn}
          transition={{ duration: 1 }}
          whileHover={{ borderRadius: "15px", background: Colors.d }}
          animate={{ opacity: [0, 0.5, 1] }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
        >
          <strong>כניסה</strong>
        </m.button>
      </div>
    </LazyMotion>
  );
}

export default LoginButton;
