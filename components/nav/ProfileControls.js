import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

function ProfileControls() {

  const { data: session } = useSession()

  const style = {
    singIn:{
      position:"absolute",
      left:"5px",
      top:"5px",
      width:"100px",
      height:"50px",
      background:"none",
      border:"none"
    },
    singOut:{}
} 
  return (
   !session ? 
 <button 
      onClick={() => signIn()}
      style={style.singIn}
    >הרשמה|התחברות
  </button> 
:
<>
 <button 
   onClick={() => signOut()}
   style={style.singOut}
   >התנתק
 </button>
 <br/>
  <Link href={"/profile"}>{session?.user?.name}Profile</Link>
</>
) 
}

export default ProfileControls;

