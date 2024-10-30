const ContactInfo = () => {
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>Full Name</h3>
        <p>Kenneth Valdez</p>
        <h3 style={styles.title}>Email</h3>
        <p>fip@jukmuh.al</p>
        <h3 style={styles.title}>Phone</h3>
        <p>(239) 816-9029</p>
        <h3 style={styles.title}>Mobile</h3>
        <p>(320) 380-4539</p>
        <h3 style={styles.title}>Address</h3>
        <p>Bay Area, San Francisco, CA</p>
        <button style={styles.editButton}>Edit</button>
      </div>
    );
  };
  
  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '14px',
      marginTop: '10px',
    },
    editButton: {
      marginTop: '20px',
      backgroundColor: '#17a2b8',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
  };
  
  export default ContactInfo;
  