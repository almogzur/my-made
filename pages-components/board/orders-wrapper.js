import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'
import { useEffect, useState } from 'react'


const OrdersWrapper=({ Mode,  renderList})=>{
  

  const { data: session ,status ,update} = useSession()


  const WrapperStyle = {
    width:"100%",
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"25px",
    justifyContent:"center"      ,
  }


    
 if (status === 'loading') {
   return <h1 style={{textAlign:'center'}}>Loading...</h1>
 }   
     

   return <div style={WrapperStyle}  
       >
       {renderList.length >0  ? 
          renderList.map((data,i)=>{

            return  Mode === "Cards" ?  
             <HCard orderData={data} key={i} /> 
             :
             <VCard orderData={data} key={i} />
             
          })
           
        :
        [1,2,3,4,5,6].map(
           (item,index) => {
             return Mode === "Cards" ?  
              <HCard key={item} />  
              :  
              <VCard  key={item}/>
   }) 
       
       }




         { 
     }
     </div>
}

export default OrdersWrapper

