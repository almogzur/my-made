import React, { useState, useEffect } from "react";
import Colors from "../../lib/colors";

const Headline = "תיאום פשוט וחכם בין לקוחות למשקי בית";

const AdText = "הכירו את XXXXX המיקרו-סרוויס החדש שלנו,"
  + "המאפשר תיאום חכם ויעיל בין לקוחות למשקי בית."
  + " הפלטפורמה החדשנית שלנו מבטיחה חוויית שירות מותאמת אישית, תוך ניהול "
  + " יעיל של משאבים וזמנים. בעזרת המיקרו-סרוויס שלנו, תוכלו ליהנות "
  + "מתהליך פשוט ואינטואיטיבי, חוסך זמן ומאמץ. בין אם אתם בעלי עסקים "
  + " המחפשים לקוחות חדשים, או לקוחות המעוניינים בשירותים איכותיים "
  + " ומותאמים לצרכים האישיים שלכם - הפתרון שלנו כאן בשבילכם. "
  + " הצטרפו היום!";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1A3636',
    color: '#D6BD98',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  main: {
    backgroundColor: Colors.a,
    color: Colors.d,
    padding: '30px',
    borderRadius: '3px',
    boxShadow: `0 3px 3px ${Colors.d}`,
    maxWidth: '800px',
    marginBottom: "150px",
    marginTop: "60px",
    textAlign: 'center',
  },
  headline: {
    color: Colors.c,
    marginBottom: '20px',
  },
  adText: {
    color: Colors.c,
    borderRadius: '3px',
  },
  floatingShape: {
    position: 'absolute',
    borderRadius: '30%',
    backgroundColor: Colors.b,
    opacity: 0.5,
    transition: 'transform 1s ease-in-out',
    boxShadow:` 0px 2px 2px ${Colors.d} `
  },
};

function Main() {
  const [shapeTransforms, setShapeTransforms] = useState({
    shape1: { transform: 'translateY(0px) rotate(50deg)' },
    shape2: { transform: 'translateY(0px) rotate(30deg)' },
    shape3: { transform: 'translateY(0px) rotate(10deg)' },
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShapeTransforms({
      shape1: {
        transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.05}deg)`,
      },
      shape2: {
        transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
      },
      shape3: {
        transform: `translateY(${scrollY * 0.7}px) rotate(${scrollY * 0.15}deg)`,
      },
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.floatingShape,
          width: '100px',
          height: '100px',
          top: '10%',
          left: '10%',
          ...shapeTransforms.shape1,
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: '150px',
          height: '150px',
          bottom: '20%',
          right: '15%',
          ...shapeTransforms.shape2,
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: '80px',
          height: '80px',
          top: '30%',
          right: '40%',
          ...shapeTransforms.shape3,
        }}
      ></div>
      <div style={styles.main}>
        <h1 style={styles.headline}>{Headline}</h1>
        <p style={styles.adText}>{AdText}</p>
      </div>
    </div>
  );
}

export default Main;
