// pages/404.js

const Custom404 = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1450A3', // Example background color
        color: '#ffffff', // Example text color
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#337CCF', // Example button color
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#191D88', // Example hover color
    };

    return (
        <div style={containerStyle}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={buttonStyle}>Back Home</a>
        </div>
    );
};

export default Custom404;
