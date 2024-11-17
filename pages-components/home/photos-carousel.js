import { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WindowWidthContext } from '../../context';

const PhotoCarousel = ({ Photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { xxs, xs } = useContext(WindowWidthContext);

  // Function to switch to the next photo
  const switchPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Photos.length);
  };

  // Automatically switch photos every 3 seconds
  useEffect(() => {
    const interval = setInterval(switchPhoto, 6000); // Change interval as needed
    return () => clearInterval(interval); // Cleanup on unmount
  }, [Photos.length]);

  return (
    
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex} // Unique key for each image to trigger exit animation
          src={Photos[currentIndex].src}
          alt={`Photo ${currentIndex + 1}`}

          initial={{ opacity: 0  }} 

          animate={{
                 opacity: 1,
                 y: [300,0],
            transition: {
              opacity: { duration: 2 },
              y: { duration: 3 ,  },
              
            },
          }}
          exit={{
            opacity: 0,
            scaleY:0, 
            scaleX:0,

            transition: {
              scaleY:{ duration:2 },
              opacity: { duration: 1 },
              scaleX:{duration:2}
            },
          }}
          style={{
            width:"auto",
            height:"auto",
            objectFit:"scale-down",
          }}
        />
      </AnimatePresence>

  );
};

export default PhotoCarousel;
