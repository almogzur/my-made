import { Container } from "@chakra-ui/react";

const ProjectStatus = () => {

  
    return (
      <Container style={styles.card}>
        <h3 style={styles.title}>הזמנות ישנות</h3>
 
      </Container>
    );
  };
  
  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '20px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    project: {
      marginBottom: '10px',
    },
    progressBar: {
      height: '6px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: '#007bff',
    },
  };
  
  export default ProjectStatus;
  