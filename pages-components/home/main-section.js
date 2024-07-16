import React, { useState, useEffect } from "react";
import Colors from "../../lib/colors";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MongoSpinner from "../../components/mongo-spinner/mongo-spinner";

const Headline = "MadeIt";

const AdText = "מיקרו-סרוויס המאפשר תיאום חכם ויעיל בין לקוחות למשק בית.";

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
    position:"relative"
  },
  main: {
    backgroundColor: Colors.a,
    color: Colors.d,
    padding: '30px',
    borderRadius: '3px',
    boxShadow: `1px 1px 1px 1px rgb(0.0.0,02)`,
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
    boxShadow: `0px 2px 2px ${Colors.d}`,
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: Colors.a,
    backgroundColor: Colors.c,
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s, color 0.3s',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: Colors.d,
    color: Colors.a,
  }
};

function Main() {
  const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const animateRotation = () => {
      setRotation(prevRotation => (prevRotation + 1) % 360);
    };

    window.addEventListener('scroll', handleScroll);

    const rotationInterval = setInterval(animateRotation, 16); // ~60 FPS

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(rotationInterval);
    };
  }, []);

  const shape1Transform = {
    transform: `translateY(${scrollY * 0.5}px) rotate(${rotation}deg)`,
  };
  const shape2Transform = {
    transform: `translateY(${scrollY * 0.3}px) rotate(${rotation}deg)`,
  };
  const shape3Transform = {
    transform: `translateY(${scrollY * 0.7}px) rotate(${rotation}deg)`,
  };

  if (status === "loading") {
    return <MongoSpinner />;
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.floatingShape,
          width: '100px',
          height: '100px',
          top: '5%',
          left: '10%',
          ...shape1Transform,
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: '150px',
          height: '150px',
          bottom: '10%',
          right: '35%',
          ...shape2Transform,
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: '80px',
          height: '80px',
          top: '30%',
          right: '30%',
          ...shape3Transform,
        }}
      >

      </div>

      <div style={styles.main}>
        <h1 style={styles.headline}>{session? session.user.name + " ברוכים הביאים ל MadeIt" : Headline}</h1>
        <p style={styles.adText}>{AdText}</p>

      </div>
    </div>
  );
}

export default Main;
