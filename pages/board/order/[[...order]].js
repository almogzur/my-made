import OrderLayout from '../../../layouts/order-layout' 
import OrderSummary from '../../../pages-components/board/OrderSummary'
import Colors from '../../../lib/colors'

 const styles = {
       paymentDetails: {
          marginTop: "20px",
         borderBottom: `1px solid ${Colors.d}`,
          paddingBottom: "15px",
      },
  }

export default function OrderPage() {

  return <OrderLayout > 
            <OrderSummary />     
         </OrderLayout>
     
}

