import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import ToggleSwitch from '../../components/t-switch/switch'
import { StateContext } from '../../context'

const VenderActiveOrEdit=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const [ state , setState ]= useState(StateContext)
  

  useEffect(()=>{

        })

        const  handelChange = ()=>{}

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <>
        <h4 style={{textAlign:"center"}}> שינטי סטטוס נותן שירות </h4>
        <ToggleSwitch 
            textOn={"זמין"}
            textOff={"לא זמין"}
            PropsOnChange={handelChange}
            STATE_KEY="Vendor"
            id={"isVendor"}
            value={state.Vendor.isVendor}

        />
    </>
) 
}

export default VenderActiveOrEdit