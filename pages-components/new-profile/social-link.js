


const SocialLinks = () => {
    const links = [
      { platform: 'Website', url: 'https://bootdey.com', icon: '🌐' },
      { platform: 'Github', url: 'https://github.com/bootdey', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/bootdey', icon: '🐦' },
      { platform: 'Instagram', url: 'https://instagram.com/bootdey', icon: '📸' },
      { platform: 'Facebook', url: 'https://facebook.com/bootdey', icon: '📘' },
    ];
  
    return (
      <div style={styles.card}>
        {links.map((link, index) => (
          <div key={index} style={styles.link}>
            <span>{link.icon}</span>
            <a href={link.url} style={styles.linkText} target="_blank" rel="noopener noreferrer">
              {link.platform}
            </a>
          </div>
        ))}
      </div>
    );
  };
  
  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '20px',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    linkText: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };
  
  export default SocialLinks;
  