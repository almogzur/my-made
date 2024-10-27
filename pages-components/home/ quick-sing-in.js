import Colors from '../../lib/colors'


function QuickcSingIn() {
    const Style = { 
        Wrapper:{
          width:"100%",
          height:"10em",
          background:Colors.c,
          color:Colors.d,  
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-around',
          alignItems:'center',
          
          
        }
      }
  
  
  
  
  return (
    <div style={Style.Wrapper} >
       {"צריך עזרה בניקוי הבית הרשם עכשיו במהירות "}
      <button>הרשמה</button>
    </div>
    )
}

export default QuickcSingIn;