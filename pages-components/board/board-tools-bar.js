import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'




const Style = {
    Wrapper:{
        width:"100%",
        background:"red",
        height:"50px",
        
    }
}

const BoardToolsBar=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{ })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
  <div 
    style={Style.Wrapper  }
  >Warrper</div>
) 
}

export default BoardToolsBar