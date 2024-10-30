import { signIn } from "next-auth/react";
import { m, LazyMotion, } from 'framer-motion';
import Colors from "../../lib/colors";
import f from '../../lib/features';

const DefultStyles =  {
    width: "150px",
    height: '80%',
    border: "none",
    background: Colors.c,
    borderRadius: "6px",
    color:"#fff"
  }


function LoginButton( { StyleProps } ) {

  return (
    <LazyMotion features={f}>
        <m.button
          style={StyleProps?? DefultStyles}
          transition={{ duration: 1 }}
          whileHover={{ borderRadius: "15px", background: Colors.a }}
          animate={{ opacity: [0, 0.5, 1] }}
          onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
        >
           { 
             <strong>{"כניסה"}</strong>
           }
        </m.button>
    </LazyMotion>
  );
}

export default LoginButton;
