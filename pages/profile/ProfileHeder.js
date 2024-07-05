import { useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';
import defulteUserImg from '@public/User.jpg';
import { UserContext } from "Context/Context"; // Corrected context import

const ProfileHeader = ({ image, name }) => {



    return (
        <div
            className='profile-header'
            style={{padding:"20px"}}
        >
            <h1 className='profile-header-text'>
                {name}
            </h1>

            <motion.div
            style={{
                borderRadius: "15px",
                position:"absolute",
                left:"30px",
                top:"90px"
                }}
             
             
             whileHover={{
                 rotate:30
             }}
             animate={{ rotate:720   }}
             transition={{ type: "spring" ,duration:5 }}
           
   
            >
                <Image
                    src={image || defulteUserImg}
                    height={70}
                    width={70}
                    alt='profile image'
                    style={{borderRadius:"15px"}}
                    fetchpriority='auto'
                />
            </motion.div>

            <h1
                style={{
                    position:  "relative",
                    top: "60px",
                    right: "0px"
                }}
            >
                פרטים
            </h1>
        </div>
    );
};

export default ProfileHeader;
