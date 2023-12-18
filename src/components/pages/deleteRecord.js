
export const deleteRecordFunction = async (route,task,records) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/${route}/${task}`, {
      method: `DELETE`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordsToDelete: records }),
    });
  
    if (response.ok) {
      console.log('Records deleted successfully');

    } else {
      console.error('Error deleting contacts:', response.statusText);
      const responseData = await response.json();
      console.log(responseData);
    }
  } catch (error) {
    console.error('Error deleting contacts:', error);
  }
}