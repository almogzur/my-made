import { useRouter } from 'next/router'
import OrderLayout from '../../../layouts/order-layout' 



 


export default function OrderPage() {
    const router = useRouter()

  return <OrderLayout> {/**this render header && footr*/}
            <OrderInfo/>

         </OrderLayout>
     
}


const OrderInfo = () => {
    return <div>info</div>
}