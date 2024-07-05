import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
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
 className="singOutDiv"
> 
  <motion.div  
    animate={{ rotate:360}}
    transition={{ type: "spring" ,duration:5 }}
    whileHover={{rotate:30}}
   >
     <Link 
       href={"/profile"}
      >
       <Image
         src={session.user.image} 
         height={50}
         width={50}
         style={{borderRadius:"15px"}}
       />  
       </Link>
   </motion.div>

   <button 
      className="singOut"
     onClick={() => signOut({
        callbackUrl:"/"
     })}
     >התנתק
  </button>
</div>
) 
}

export default ProfileControls;

