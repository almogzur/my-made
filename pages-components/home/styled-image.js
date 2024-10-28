import Image from "next/image";
import { m, domAnimation, LazyMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { type } from "os";

const StyledImage = ({ Images, timer = 3000, PropsImageStyle, PropsDivStyle }) => {
  const [index, setIndex] = useState(0); 
  const [src, setSrc] = useState(Images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, timer);

    return () => clearInterval(intervalId);
  }, [Images.length, timer]);

  useEffect(() => {
    setSrc(Images[index]); 
  }, [index, Images]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        
        key={index} // key is not only for List its can triger rerender if changed 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1  }}
        transition={{
          opacity: { duration: 2 },
          ease: "ease",
          
        }}
        style={PropsDivStyle? PropsDivStyle :  {}}
      >
        <Image style={PropsImageStyle ? PropsImageStyle : {}} src={src} alt="נקיון בבית" />
      </m.div>
    </LazyMotion>
  );
};

export default StyledImage;
