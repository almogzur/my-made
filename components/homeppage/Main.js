
export const metadata={
    
}
const Headline = "תיאום פשוט וחכם בין לקוחות למשקי בית"

const AdText = "הכירו את  XXXXX המיקרו-סרוויס החדש שלנו,"
 +"המאפשר תיאום חכם ויעיל בין לקוחות למשקי בית."
 +" הפלטפורמה החדשנית שלנו מבטיחה חוויית שירות מותאמת אישית, תוך ניהול "
 +" יעיל של משאבים וזמנים. בעזרת המיקרו-סרוויס שלנו, תוכלו ליהנות "
 +"מתהליך פשוט ואינטואיטיבי, חוסך זמן ומאמץ. בין אם אתם בעלי עסקים "
 +" המחפשים לקוחות חדשים, או לקוחות המעוניינים בשירותים איכותיים "
 +" ומותאמים לצרכים האישיים שלכם - הפתרון שלנו כאן בשבילכם. "
 +" הצטרפו היום!"

function Main() { 
    return (
        <>
        <div
          className="main"
        >{<h1>{Headline}</h1>}
            
        </div>
        <p 
         className="ad-text"
        >{AdText}</p>
   </>
     );
}

export default Main;
