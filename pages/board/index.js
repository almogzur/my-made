//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 


import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import BoarfLayout from '@layouts/BoardLayout'

const BoardPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <BoarfLayout>
      
    </BoarfLayout>
) 
}

export default BoardPage