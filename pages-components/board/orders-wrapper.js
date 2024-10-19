import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'
import { useEffect, useState } from 'react'


const OrdersWrapper=({ Mode ,filterCity , filterPriceArray , Orders})=>{

  const filterOredersByCity = (city ) => {
    console.log("fired",city);
    
    let temp = [ ]

         Object.entries(Orders).map((array,i)=>{
  
             const map_city   = array[0]
             const map_cityOrders  = array[1]
             const index  = i 
  
                if( map_city === filterCity ){
                  console.log("pusging");
                  
                     temp.push(map_cityOrders)          
               }
               
               
             } )             
        return temp   
     
   }   

  const { data: session ,status ,update} = useSession()
  const [ citylist  , setCityList  ] = useState( filterOredersByCity(filterCity))


  useEffect(()=>{
  console.log(citylist);
  
  },[citylist])
   


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
       {citylist.length >= 0 ?
         <div>{JSON.stringify(citylist)}</div>
           
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

