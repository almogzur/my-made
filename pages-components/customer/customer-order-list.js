import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import useUser from '../../lib/hooks/useUser'
import Colors from '../../lib/colors'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'



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

const CustomerOrderList=()=>{



  const { data: session ,status ,update} = useSession()
  const { user , isLoading , isError } = useUser(session?.user?.email)
  
  //useEffect(()=>{   })

  if (status === 'loading' || isLoading ) {
     return <MongoSpinner propsname={"הזמנות"}/>
}



  else if(user?.Orders){

     return   <div style={Style.Wrapper}>
     <h3 style={{ textAlign: "center" }}>הזמנות</h3>
     <table style={Style.table}>
       <thead style={Style.tableHead}>
         <tr style={Style.tableRow}>
           <td style={Style.cell}>&nbsp;</td>
           <td>כתובת</td>
           <td>טלפון</td>
           <td>תאריך</td>
         </tr>
       </thead>
       <tbody>
         {user?.Orders.map((order, index) => (
           <tr key={index} style={Style.tableRow}>
             <td style={Style.cell}>{index + 1}</td>
             <td>{order.addres}</td>
             <td>{order.phone}</td>
             <td>{new Date(order.ResurveDate).toLocaleDateString()}</td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
  }
  else{
    return <DemoLisat/>
  }





}

export default  CustomerOrderList 


const DemoLisat = ()=>{

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

       <tbody  >
         <tr scope="col" style={Style.tableRow}>
            <td style={Style.cell}>1</td>
            <td >...</td>
            <td>...</td>
            <td>...</td>
         </tr>
        </tbody>

      </table>
   </div>
    ) 

}