// pages/_error.js (if using pages directory)
// or app/[error].jsx (if using app directory)

import React from 'react';
import Link from 'next/link';

// Define your colors
const Colors = {
  a: "#191D88", // 70%
  b: "#1450A3", // 15%
  c: "#337CCF", // 10%
  d: "#FFC436", // 5%
};

const ErrorPage = ({ statusCode }) => {
  return (
    <div style={styles.errorContainer}>
      <h1 style={styles.heading}>{statusCode ? `Error ${statusCode}` : 'An error occurred'}</h1>
      <p style={styles.message}>Sorry, something went wrong.</p>
      <Link href="/" passHref>
        <button style={styles.homeButton}>Go to Home</button>
      </Link>
    </div>
  );
};

const styles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: Colors.a, // 70% background color
    color: Colors.d, // Use contrasting color for text
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: Colors.d, // Use a contrasting color for the heading text
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: Colors.d, // Use a contrasting color for the message text
  },
  homeButton: {
    backgroundColor: Colors.c, // Button background color
    color: 'white', // Button text color
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  homeButtonHover: {
    backgroundColor: Colors.b, // Button hover color
  }
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
