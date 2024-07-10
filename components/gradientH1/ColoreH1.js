


function ThreeColorsH1({
    text,
    color1,
    color2,
    color3,
    angleDeg,
    style
    }) {
        
        const defaultAngle = "90deg"

    return ( 
        <h2
         style={{
            background:`linear-gradient(
            ${angleDeg?angleDeg:"90deg"},
                 ${color1 ? color1 : 'rgba(131,58,180,1) '  },
                 ${color2 ? color2 :'rgba(253,29,29,1)' } ,
                 ${color3 ? color3 :'#fff'} 
             )`,
            color:"transparent",
            backgroundClip:"text",
            ...style
         }
         }
        >{text? text : "Hello World"}</h2>
     );
}

export default ThreeColorsH1 ;