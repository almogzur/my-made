import { useSession } from 'next-auth/react'
import {useEffect,useState,useContext} from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import { delay, motion } from 'framer-motion'
import Image from 'next/image'
import defulteUserImg from "@public/User.jpg"
import defualtProfileImage from "public/backgroundCover.jpg"
import { UserContaxt, CostumrContaxt,VendorContaxt } from 'contaxt/contaxt'

  

const ProfileHeader=({image,headline,text})=>{

    const [User,serUser]=useContext(UserContaxt)



return (   
  <div

    style={{
       width:"100%",
       height:"370px",

       padding:0,
       boxShadow: "inset 0 0px 0px #00c0ff ,0 0 0 0px white ,0px 0px 0.7em #404040", 
       }}
    >     
      <Image
        height={"370"} 
        style={{width:"100%",zIndex:0}} 
        src={defualtProfileImage}
        
      />  
     <h1
        
         className='profile-heder-text' 
        
         >
         {text}
     </h1>

     <h1 style={{position:"relative",top:"-70px",left:"-10px"}} >פרטים</h1>

     <motion.div 
         className='profile-heder-img'
         animate={{ x: [0,-70,0] ,rotate : 360 }}
         transition={{duration:3,ease:"anticipate"}}
       >
       <Image
        src={image?image:defulteUserImg} 
        style={{    
          borderRadius:"15px"
          }}
        height={100} 
        width={100} 
        alt='profile image'
         />
     </motion.div>
     

 </div>
   ) 
}

export default ProfileHeader