import { useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import defulteUserImg from '@public/User.jpg';
import { ColorsContext } from "Context/Context"; // Corrected context import

const ProfileHeader = ({ image, name }) => {

    const Colors = useContext(ColorsContext)

    return (
        <motion.div

            style={{
                padding:"20px",
                width:"100%",
                height:"200px",
                border:"none",    
                background: 'rgb(25,29,136)',
                background: 'linear-gradient(329deg, rgba(25,29,136,1) 0%, rgba(20,80,163,1) 21%, rgba(255,255,255,1) 100%)',
                boxShadow: '0 4px 8px #404040'
                }}
        >
            <motion.h1 
                
             style={{   
                position:"absolute",
                 top:"00px",
                 right: "10px",
    }}
            >
                {name}
            </motion.h1>

            <motion.div
             style={{
                borderRadius: "15px",
                position:"absolute",
                left:"10px",
                top:"20px"
                }}
             whileHover={{
                 rotate:30
             }}
             animate={{ rotate:720 }}
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

            <motion.h1
                style={{
                    position:  "relative",
                    top: "100px",
                    right: "-10px"
                }}
            >
                פרטים
            </motion.h1>
        </motion.div>
    );
};

export default ProfileHeader;
