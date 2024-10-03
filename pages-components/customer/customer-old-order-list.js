import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Colors from '../../lib/colors';


const Style = { 
    Wrapper: {
      padding: "0px",
      tran: "ease out 1s",
      borderBottom: "solid 1px black",
      width: "100%", 
    },
    table: {      
      height: "70%",
      border: "solid",
      borderCollapse: "collapse",
      width: "100%",
    },
    tableHead: {
      background: Colors.d,
    },
    tableBody: {},
    tableRow: {
      height: "30px",
      border: "solid",
      borderCollapse: "collapse",
      border: "solid 1px",
      
    },
    cell: {
      border: "solid",
      cursor: "pointer",
      border: "solid 1px",
    },
    expandedRow: {
      backgroundColor: '#f0f0f0',
      border: "solid 1px",
    },
    button: {
      background: Colors.d,
      color: Colors.a,
      marginTop: '15px',
      width: "100px",
      height: "35px",
      marginBottom: "15px",
    },
  
  };

const OldOrderList=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}


    return (
        <div style={Style.Wrapper}>
          <h3 style={{ textAlign: "center" }}> הזמנות סגורות </h3>
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
              <tr scope="col" style={Style.tableRow}>
                <td style={Style.cell}>1</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      );






}

export default OldOrderList