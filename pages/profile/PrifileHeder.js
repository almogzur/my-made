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
                className='profile-header-img'
                animate={{ x: [0, -70, 70,0], rotate: 360 }}
                transition={{ duration: 3, ease: "anticipate" }}
            >
                <Image
                    src={image || defulteUserImg}
             
                    style={{ 
                        borderRadius: "15px",
                        position:"absolute",
                        left:"0px",
                        top:"-50px"
                         }}
                    height={100}
                    width={100}
                    alt='profile image'
                />
            </motion.div>

            <h1
                style={{
                    position:  "relative",
                    top: "250px",
                    right: "0px"
                }}
            >
                פרטים
            </h1>


        </div>
    );
};

export default ProfileHeader;
