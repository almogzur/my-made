const ProjectStatus = () => {
    const projects = [
      { name: 'Web Design', progress: 80 },
      { name: 'Website Markup', progress: 60 },
      { name: 'One Page', progress: 90 },
      { name: 'Mobile Template', progress: 50 },
      { name: 'Backend API', progress: 70 },
    ];
  
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>Project Status</h3>
        {projects.map((project, index) => (
          <div key={index} style={styles.project}>
            <span>{project.name}</span>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progress, width: `${project.progress}%` }}></div>
            </div>
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
  