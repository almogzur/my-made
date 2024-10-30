import Image from "next/image";
import { useRouter } from "next/router";

function Logo({ imamge   , height, width  , path , propsStyle , imgAlt}) {
    const router = useRouter()
    return (  
        <Image 
            height={height} 
            width={width}  
            src={imamge}
            onClick={()=>{router.push(path)}}
            style={propsStyle?? {}}
            alt={imgAlt?? "Logo" }
              />
    );
}

export default Logo