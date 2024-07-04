
export async function updateUserState(state) {
    try {
      const response = await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state }),
      })
  
      if (!response.ok) {
        throw new Error('Failed to update user state')
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating user state:', error)
      throw error
    }
  }