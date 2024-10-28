import { m, domAnimation, LazyMotion } from "framer-motion";

const CopyText = {
    Headline : "MadeIt", 
    Text1 : `  צריכים עוזר/ת בית הרשם עכשיו  ?`,
    Text2 : `רוצה לראות את לוח  הדורשים עבודה הרשם עכשיו`,
    bulletPoints:""
   
 }
 
const SlidingTextWrapper = ()=>{
    const Style =  {
     Wrapper:{ 
        height:"50%",
        width :"100%",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
 
    },
     HeadLine:{
        fontSize:"2em",
        width:"50%"
     }
 
    }
    
  return (
     <LazyMotion features={domAnimation}>
        <div  style={Style.Wrapper} >

          <AnimatedH1
            textStr={CopyText.Headline}
            styleObj={Style.HeadLine}
            initialObj={{}}
            animateObj={{}}
            transitionObj={{}}
          />
          <AnimatedH1
            textStr={""}
            styleObj={{}}
            initialObj={{}}
            animateObj={{}}
            transitionObj={{}}

          />
          <AnimatedH1
            textStr={""}
            styleObj={{}}
            initialObj={{}}
            animateObj={{}}
            transitionObj={{}}
          />
        
         </div>
    </LazyMotion>
   )
 }
 export default SlidingTextWrapper




 const AnimatedH1 = ({   textStr , initialObj, animateObj ,styleObj , transitionObj })=>{

        return <m.h1 
                 initial={initialObj?? null}
                 animate={animateObj?? null}
                 transition={transitionObj??null}
                 style={styleObj??null}
               >
               {textStr}    
              </m.h1>
 } 
 