import Colors from "../../lib/colors";
import AnimatedHeadline from "./animated-headline";

const CopyText = {
    Headline: "MadeIT", 
    Text1: "!צריכים עוזר/ת בית?... " , 
    Text2 :" הרשמו עכשיו ", 
    Text3: "תיאום קל ופשוט",
 
};

const SlidingTextWrapper = () => {

    
    const Style = {
        Wrapper: { 
        
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
        },
        HeadLine: {
            fontSize: "6em",
            color: Colors.c,
            fontWeight: "bold",
        },
        Text: {
            fontSize: "1.9em",
            marginBottom: "0.5em"
        },

    };

    const animations = {
        HeadLine: {
            initial: { x: 100, opacity: 0 },
            animate: { x: 0, opacity: 1 , type:"sping" },
            transition: { duration: 2, ease: "easeOut" }
        },
        Text1: {
            initial: { x: -100, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 2, delay: 0.5, ease: "easeOut" }
        },
        Text2: {
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 2, delay: 1, ease: "easeOut" }
        },
        bulletPoint: {
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 2, delay: 1.5, ease: "easeOut" }
        }
    };

    return (
            <div style={Style.Wrapper}>

                 <AnimatedHeadline
                    textStr={CopyText.Headline}
                    styleObj={Style.HeadLine}
                    initialObj={animations.HeadLine.initial}
                    animateObj={animations.HeadLine.animate}
                    transitionObj={animations.HeadLine.transition}
                />
                <AnimatedHeadline
                    textStr={CopyText.Text1}
                    styleObj={Style.Text}
                    initialObj={animations.Text1.initial}
                    animateObj={animations.Text1.animate}
                    transitionObj={animations.Text1.transition}
                />
                <AnimatedHeadline
                    textStr={CopyText.Text2}
                    styleObj={Style.Text}
                    initialObj={animations.Text2.initial}
                    animateObj={animations.Text2.animate}
                    transitionObj={animations.Text2.transition}
                />
                <AnimatedHeadline
                    textStr={CopyText.Text3}
                    styleObj={Style.Text}
                    initialObj={animations.bulletPoint.initial}
                    animateObj={animations.bulletPoint.animate}
                    transitionObj={animations.bulletPoint.transition}
                />
            </div>
    );
};

export default SlidingTextWrapper;


