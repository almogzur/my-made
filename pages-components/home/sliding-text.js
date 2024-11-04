import { Container ,Flex} from "@chakra-ui/react";
import Colors from "../../lib/colors";
import AnimatedHeadline from "./animated-headline";
import { delay } from "framer-motion";



 const headLine ={
                Text: "MadeIT", 
                animation :{ 
                    initial: { y:200, opacity: 0 },
                    animate: { y: 0, opacity: 1 , type:"sping" },    
                    transition: { duration: 1, ease: "easeOut" }
                },
                style:{   fontSize: "4.5em", color: Colors.c , fontWeight: "bold",}
                } 

const CopyText = [ 
        
        {Text: "צריכים עוזר/ת בית?",
          animation:{
            initial: { height:0, opacity: 0 , delay:"0.2"  },
            animate: {  opacity: 1 , height:'auto' , ease:"backInOut"},
            transition: { duration: 2, delay: 0.5, ease: "easeOut" ,}
           },
           style:{  fontSize: "2.9em", marginBottom: "0.5em"}
     

        },
        {Text :" הרשמו עכשיו ",
        animation:{
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 2, delay: 1, ease: "easeOut" }
            },
        style:{  fontSize: "2.9em", marginBottom: "0.5em"}
        }, 
        {Text: "תיאום קל ופשוט",
        animation:{
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 2, delay: 1.5, ease: "easeOut" }
        },
        style:{  fontSize: "2.9em", marginBottom: "0.5em"}
        }
]


const SlidingTextWrapper = () => {


    return (
            <Container p={0} m={0} > 
                <Flex  direction={"column"} alignItems={"center"}    textAlign={"center"} color={"#fff"} p={0}  >
                              <AnimatedHeadline 
                                
                                     text={headLine.Text} 
                                     style={headLine.style} 
                                     initia={headLine.animation.initial} 
                                     animate={headLine.animation.animate} 
                                     transition={headLine.animation.transition} 

                                     />
                {CopyText.map((obj,i)=>{
                        return  <AnimatedHeadline 
                                     key={i} 
                                     text={obj.Text} 
                                     style={obj.style} 
                                     initia={obj.animation.initial} 
                                     animate={obj.animation.animate} 
                                     transition={obj.animation.transition} 

                                     />
                })}



          
                </Flex>
            </Container>
    )
};

export default SlidingTextWrapper;


