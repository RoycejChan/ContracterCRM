const backendURL = 'http://localhost:3000'; 

export const deleteRecordFunction = async (route,task,records) => {
  try {
    const response = await fetch(`${backendURL}/${route}/${task}`, {
      method: `DELETE`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordsToDelete: records }),
    });
  
    if (response.ok) {
    } else {
      console.error('Error deleting contacts:', response.statusText);
      const responseData = await response.json();
      console.log(responseData);
    }
  } catch (error) {
    console.error('Error deleting contacts:', error);
  }
}