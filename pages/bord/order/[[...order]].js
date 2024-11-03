import Colors from '../../../lib/colors'
import {  useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { OrderContext } from '../../../context';
import { useContext } from 'react'

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    marginTop:"2em",
    border: `1px solid ${Colors.d}`,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    fontFamily: "'Arial', sans-serif",
    color: Colors.text,
    direction: "rtl", // Right-to-left for Hebrew
    textAlign: "right",
  },
  orderSummary: {
    borderBottom: `1px solid ${Colors.d}`,
    paddingBottom: "15px",
  },
  paymentDetails: {
    marginTop: "20px",
    borderBottom: `1px solid ${Colors.d}`,
    paddingBottom: "15px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: Colors.d,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "18px",
  },
  button: {
    backgroundColor: Colors.d,
    color: Colors.c,
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  changeSection: {
    textAlign: "center",
    marginTop: "20px",
  },
  info: {
    fontSize: "12px",
    color: Colors.d,
  },
  cancelButton: {
    backgroundColor: Colors.d,
    color: Colors.text,
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};


export default function OrderPage() {
  const { data: session ,status ,update} = useSession()
  const [Order, setOrder] = useContext(OrderContext);
  const router = useRouter()


  useEffect(()=>{
    if( status==="unauthenticated"|| !Order){
        
     router.push("/")
    }
    // when component unmount clear Context , and clear orders 

    
  },[status])

  return (
    <div style={styles.container}>
    <div style={styles.orderSummary}>
      <h2 style={styles.heading}>סיכום הזמנה</h2>
      <div style={styles.row}>
        <span>מספר הזמנה:</span>
        <span>{Order?.orderId}</span>
      </div>
      <div style={styles.row}>
        <span>סכום לשעת עבודה :</span>
        <span>₪{Order?.orderPrice || "0.00"}</span>
      </div>
      <div style={styles.row}>
        <span>מספר חדרי אמבטיה:</span>
        <span>{Order?.NumberOfBaths}</span>
      </div>
      <div style={styles.row}>
        <span>מספר חדרים בדירה:</span>
        <span>{Order?.ApartmentRoomsNumber}</span>
      </div>
      <div style={styles.row}>
        <span>גודל הדירה במטרים:</span>
        <span>{Order?.ApartmentSize || "N/A"}</span>
      </div>

      <div style={styles.row}>
        <span>עיר/אזור:</span>
        <span>{Order?.city}</span>
      </div>
      <div style={styles.row}>
        <span>כתובת:</span>
        <span>{Order?.addres}</span>
      </div>
      <div style={styles.row}>
        <span>תאריך הזמנה:</span>
        <span>{new Date(Order?.ResurveDate).toLocaleString('he-IL')}</span>
      </div>
      <div style={styles.paymentDetails}>
      <h3 style={styles.heading}>פרטי תשלום</h3>

      <div style={styles.row}>
        <span>סכום:</span>
        <span>₪{Order?.orderPrice || "0.00"}</span>
      </div>
      <button style={styles.button}>בדוק מצב הזמנה</button>
    </div>

    <div style={styles.changeSection}>
      <h4>צריך לשנות משהו?</h4>
      <p style={styles.info}>אפשר לבטל תוך שעה אחת.</p>
      <button  onClick={()=>{router.back()}} style={styles.cancelButton}>חזרה להזמנות </button>
    </div>

    </div>

  
  </div>
  )         
}

