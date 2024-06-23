import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'

const ProfileHeader=({image,headline,text})=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession(

  )

  useEffect(()=>{ })

    if (status === 'loading') {
        return <LoadingSpinner/>
}

return (<div></div>) 
}

export default ProfileHeader