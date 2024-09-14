import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import useUser from '../../lib/hooks/useUser'
import Colors from '../../lib/colors'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'



const CustomerOrderList=()=>{

  const Style = { 
    Wrapper:{
      paddingL:"0px",
      borderBottom:" solid 1px black",
  },
    table:{      
      height:"70%",
      width:"100%",
      border:"solid",
      borderCollapse: "collapse"

    },
    tableHead:{
      background:Colors.d,
    },
    tableBody:{
        },
     tableRow:{
        height:"30px",
        border:"solid",
        borderCollapse: "collapse"
     },
     cell:{border:"solid "}
  }

  const { data: session ,status ,update} = useSession()
  const { user , isLoading , isError } = useUser(session?.user?.email)

  
  //useEffect(()=>{   })

  if (status === 'loading' || isLoading ) {
     return <MongoSpinner propsname={"הזמנות"}/>
}

  

    

return (

     <div style={Style.Wrapper}>
   
     <h3 style={{ textAlign:"center"}}> הזמנות</h3>
     <table style={Style.table } >


         <thead style={Style.tableHead}> 
          <tr style={Style.tableRow} >
          <td style={Style.cell}  > &nbsp; </td>
          <td  >כתובת </td>
          <td >טלפון </td>
          <td  >תאריך </td>
        </tr>

         </thead>

        <tbody style={Style.tableBody} >

          <tr scope="col" style={Style.tableRow}>
             <td style={Style.cell}>1</td>
             <td s>...</td>
             <td>...</td>
             <td>...</td>
          </tr>

       <tr style={Style.tableRow}>
         <td style={Style.cell}>2</td>
         <td>...</td>
         <td>...</td>
         <td>...</td>
       </tr>
       
      <tr style={Style.tableRow}>
        <td style={Style.cell}>3</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>

         </tbody>

       </table>
    </div>
     ) 
}

export default  CustomerOrderList 