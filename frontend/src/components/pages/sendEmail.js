export const sendEmail = async (records, getEmailFunction, backendURL, emailSubject, emailMsg, emailFile, onClose) => {
  try {
    const formData = new FormData();

    const toEmails = records.map((record) => {
      const contact = getEmailFunction(record);
      return contact && contact.Email;
    });

    formData.append('to', toEmails.join(',')); 
    formData.append('subject', emailSubject);
    formData.append('text', emailMsg);

    if (emailFile) {
      formData.append('file', emailFile);
    }

    const response = await fetch(`${backendURL}/sendEmail`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Email sent successfully');
      onClose();
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};