import  { useState } from 'react';
import CreateNewNav from '../createNav/createNav';
import { Input, Stack} from '@chakra-ui/react';
import pfp from '../../../assets/otherpfp.png';
import './newContact.css';


interface ContactInfo {
  firstName: string;
  lastName: string;
  accountName: string;
  email: string;
  workPhone: number | null;
  mobilePhone: number | null;
  assistantName: string;
  title: string;
  department: string;
  fax: number | null;
  asstPhone: string | null;
}

export default function CreateContact() {

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    accountName: '',
    email: '',
    workPhone: null,
    mobilePhone: null,
    assistantName: '',
    title: '',
    department: '',
    fax: null ,
    asstPhone: null,
  });

  const backendURL = 'http://localhost:3000';

  const save = async () => {
    try {
      // Validate required fields
      const requiredFields = inputFields.filter((field) => field.required);
  
      for (const field of requiredFields) {
        if (!contactInfo[field.key]) {
          console.error(`${field.label} is required.`);
          return;
        }
      }
  
      const response = await fetch(`${backendURL}/Contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newContact: contactInfo }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('hello');
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const inputFields = [
    { label: 'First Name', key: 'firstName', required: true },
    { label: 'Last Name', key: 'lastName', required: true },
    { label: 'Account Name', key: 'accountName', required: true },
    { label: 'Email', key: 'email', required: true, type:'email' },
    { label: 'Work Phone', key: 'workPhone', required: true, type:"number"},
    { label: 'Mobile Phone (Optional)', key: 'mobilePhone', type:"number"},
    { label: 'Assistant Name (Optional)', key: 'assistantName' },
    { label: 'Title', key: 'title', required: true },
    { label: 'Department', key: 'department', required: true },
    { label: 'Fax (Optional)', key: 'fax', type:"number" },
    { label: 'Asst Phone (Optional)', key: 'asstPhone', type:"number" },
  ];

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = value.trim() === '' ? null : value;
  
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [field]: sanitizedValue,
    }));
  };



  return (
    <>
      <form action="#">
        <CreateNewNav page="Contact" onButtonClick={save} />

        <div className="new-container">
          <div className="new-PFP">
            <h1 className="text-2xl">Contact Image</h1>
            <div className="contactpfp">
              <img src={pfp} alt="PFP" />
            </div>
          </div>
          <div className="newContact">
            <h1 className="text-2xl mb-4">Contact Information</h1>
            <div className="newContactInfo flex justify-between">
              <div className="input-container">
              <Stack spacing={6}>
              {inputFields.slice(0, 6).map((field) => (
    <Input
      key={field.key}
      placeholder={field.label}
      size="lg"
      width="40rem"
      required={field.required}
      type={field.type === 'number' ? 'number' : (field.type === 'email' ? 'email' : 'text')}
      inputMode={field.type === 'number' ? 'numeric' : (field.type === 'email' ? 'email' : 'text')}
      onChange={(e) => handleInputChange(field.key, e.target.value)}
    />
  ))}
</Stack>
              </div>
              <div className="input-container">
              <Stack spacing={6}>
              {inputFields.slice(6).map((field) => (
    <Input
      key={field.key}
      placeholder={field.label}
      size="lg"
      width="40rem"
      required={field.required}
      type={field.type === 'number' ? 'number' : (field.type === 'email' ? 'email' : 'text')}
      inputMode={field.type === 'number' ? 'numeric' : (field.type === 'email' ? 'email' : 'text')}
      onChange={(e) => handleInputChange(field.key, e.target.value)}
    />
  ))}
</Stack>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
