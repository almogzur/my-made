import {m, domAnimation, LazyMotion } from "framer-motion";

const AnimatedHeadline = ({ textStr, initialObj, animateObj, styleObj, transitionObj }) => {
    return (
        <LazyMotion features={domAnimation}>

        <m.h1 
            initial={initialObj ?? null}
            animate={animateObj ?? null}
            transition={transitionObj ?? null}
            style={styleObj ?? null}
        >
            {textStr}
        </m.h1>
        </LazyMotion>
    );
};
export default AnimatedHeadline