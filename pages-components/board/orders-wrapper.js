import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'


const OrdersWrapper=({ Mode,  renderList , filterCity})=>{
  const { data: session ,status ,update} = useSession()

  const WrapperStyle = {
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"2em",
    justifyContent:"center",

  }
 
 if (status === 'loading') {
   return <h1 style={{textAlign:'center'}}>Loading...</h1>
 }   
     
   return <div style={WrapperStyle}  
       >
       
     
       {renderList.length > 0  ? 
       
          renderList.map((data,i)=>{

            return  Mode === "Cards" ?  

              
              <>
              <HCard OrderData={data} key={i} /> 
              </>
             
             :
             <VCard OrderData={data} key={i} />
             
          })
           
        :
        <div>אין המנות</div>
   
     }
     </div>
}

export default OrdersWrapper

