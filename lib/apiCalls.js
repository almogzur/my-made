

const handleSave = async (Data,URL) => {
   
  const options = { 
       method: 'POST',
       headers: {'Content-Type' : 'application/json',},
       body : JSON.stringify(Data)  
      }

    try {
      const response = await fetch(URL,options);

      if (response.ok) {
              // Handle success
           console.log('Profile updated successfully');
          }
      else {
           // Handle errors
            console.error('Failed to update profile');
}
}
      catch (error) {
            console.error('Error updating profile:', error);
            }
    }