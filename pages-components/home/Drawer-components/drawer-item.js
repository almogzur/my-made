 import {  LazyMotion, m  } from "framer-motion";
 import f from '../../../lib/features'
import Colors from "../../../lib/colors";

const DrawerItem = ({ text ,children , propsStyle  , PropsOnClick  } ) => {

    const Style = {
            Wrapper: {
                   border: "none",
                   width: "100%",
                   height: "60px",
                   borderRadius: "9px",
                   backgroundColor: "#333",      
                   color: "#fff",                  
                   fontSize: "16px",             
                    fontWeight: "600",           
                    cursor: "pointer",             
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                    marginTop:"10px",
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',  
}
    }

    return <LazyMotion features={f}>
              <m.button 
                initial={{ opacity: 0, y:0  , x : 300 }}
                animate={{ opacity: 1, y: 0 , x:0}}
                transition={{ duration: 1 , delay:0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.5)" , color:Colors.c}} 
                style={{ ...Style.Wrapper, ...propsStyle }}
                onClick={PropsOnClick?? null}

             
                 >
                 {children}
                 {text}
              </m.button>
            </LazyMotion>
  }
  export default DrawerItem