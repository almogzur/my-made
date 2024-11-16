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
          initial={{ opacity: 0, y: 260 }} // Start below the view
          animate={{
            opacity: 1,
            y: 0,
            rotate:[20,0],
            transition: {
              opacity: { duration: 2 },
              y: { duration: 3 ,  },
              rotate:{type:"spring",damping:4  }
            },
          }}
          exit={{
            opacity: 0,
            x: -630, // Exit upwards
            transition: {
              x: { duration: 2 , type:"tween" },
              opacity: { duration: 1 },
            },
          }}
          style={{
            width: xxs && xs ? "800px" : "400px",
            height: xxs && xs ? "600px" : "200px",
            borderRadius:"3%",
            objectFit:"cover"
            
          }}
        />
      </AnimatePresence>

  );
};

export default PhotoCarousel;
