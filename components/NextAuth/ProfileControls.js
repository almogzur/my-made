import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";

function ProfileControls() {

  const { data: session } = useSession()
  
  return (
   !session ? 
 <button 
      onClick={() => signIn(undefined,{callbackUrl:"/profile"})}
      className="singIn"
    >הרשמה או התחברות
 </button> 
:
 <div 
   style={{
     position:"absolute",
     top:"0px",
     left:"0px",
     width:"150px",
     display:"flex",
     flexDirection:"row"
}}
 > 
    <motion.div  
      animate={{ rotate:360}}
      transition={{ type: "spring" ,duration:5 }}
      whileHover={{rotate:30}}
   >
     <Link 
       href={"/profile"}
       shallow={true}
      >
       <Image
         src={session.user.image} 
         height={50}
         width={50}
         style={{borderRadius:"15px"}}
         alt="User Profile Link"
       />  
       </Link>
   </motion.div>

   <motion.button 
   style={{
       border:"none",
       background:"none",
       width:"inherit",
       height:"inherit",
       color:"#fff",

}}
    animate={{ rotate:360}}
    transition={{ type: "spring" ,duration:5 }}
    whileHover={{rotate:35}}
        onClick={() => signOut({
        callbackUrl:"/"
     })}
     ><FaPowerOff size={45}/>
  </motion.button>
</div>
) 
}

export default ProfileControls;

