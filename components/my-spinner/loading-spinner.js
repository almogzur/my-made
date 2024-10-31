import { Spinner } from "@chakra-ui/react"

const profilePageStyle = {
    height:"300px" ,
display:'flex',
justifyContent:'center',
alignItems:'center',
background:"#fff"      
}

function LoadingSpinner () {
    return   <div style={profilePageStyle}>
               <Spinner size={"lg"}  />
            </div>
     
}

export default LoadingSpinner