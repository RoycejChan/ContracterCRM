// // Assuming you have an API endpoint for updating a contact record
// const updateRecordFunction = async (endpoint, record) => {
//     try {
//       const response = await fetch(`${backendURL}/`, {
//         method: 'PUT', // Adjust the HTTP method based on your API
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers if required
//         },
//         body: JSON.stringify(record),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update record');
//       }
  
//       const updatedRecord = await response.json();
//       return updatedRecord;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export { updateRecordFunction };