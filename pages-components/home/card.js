import Colors from "../../lib/colors";
 import {   motion  } from "framer-motion";

import { Container } from "@chakra-ui/react";

const Style = {
  card: {
      width:"280px",
      border:"solid 0.1em #fff",
      display:'flex',
      flexDirection:'column',
      margin:"1em",
      borderRadius: '6px',
      boxShadow: '0 8px 16px rgba(255, 255, 255, 1)', // White shadow
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      color:"#fff"
  },
  image: { 
    margin:"20px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '16px',
    height:"230px",
    display:'flex',
    flexDirection:'column',
    justifyContent:"space-evenly",
    alignItems:'center',
    
  },
  Title: {
    fontSize: '1.5em',
    height:"100px",
    width:"100%",
    textAlign:"center"
   },
  btn: {
    width: '100%',
    background: Colors.c,
    height:"60px",
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },

};

const Card = ({text,IconEl  }) => {
  return (
      <motion.div
        style={Style.card}
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 , delay:0.1}}
        viewport={{ once: false, amount: 0.4 }} 
       >
       <Container style={Style.image} >
           <IconEl size={"11em"} color={Colors.c}/>
      </Container>
      
      <Container style={Style.content}>
          <h2 style={Style.Title}>{text}</h2>
      </Container>
      
      </motion.div>
  );
};

export default Card
