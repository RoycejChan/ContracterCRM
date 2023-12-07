import  { useState } from 'react';
import CreateNewNav from '../createNav/createNav';
import pfp from '../../../assets/otherpfp.png';
import './newContact.css';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { PhoneIcon , EmailIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
  
      const response = await fetch(`${backendURL}/Contact/newContact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newContact: contactInfo }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
      console.log('hello');
      const data = await response.json();
      console.log('Server response:', data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const inputFields = [
    { label: 'First Name', key: 'firstName', required: true },
    { label: 'Last Name', key: 'lastName', required: true },
    { label: 'Account Name', key: 'accountName', required: true },
    { label: 'Email', key: 'email', required: true, type:'email' },
    { label: 'Work Phone', key: 'workPhone', required: true, type:"tel"},
    { label: 'Mobile Phone (Optional)', key: 'mobilePhone', type:"tel"},
    { label: 'Assistant Name (Optional)', key: 'assistantName' },
    { label: 'Title', key: 'title', required: true },
    { label: 'Department', key: 'department', required: true },
    { label: 'Fax (Optional)', key: 'fax', type:"number" },
    { label: 'Asst Phone (Optional)', key: 'asstPhone', type:"tel" },
  ];

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = value.trim() === '' ? null : value;
  
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [field]: sanitizedValue,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save(); 
  };


  const cancel = () => {
    navigate(-1);
  }

  return (
    <>
    <div className="background">
      <form onSubmit={handleSubmit}>
        <CreateNewNav page="Contact" onButtonClick={save} onCancel={cancel} />
        
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
    <InputGroup key={field.key} size="lg" width="40rem">
    {(field.key === 'workPhone' || field.key === 'mobilePhone' || field.key === 'asstPhone') && (
  <InputLeftElement pointerEvents='none'>
  <PhoneIcon color='gray.300' />
</InputLeftElement>
    )}

          {field.key === 'email' && (
  <InputLeftElement pointerEvents='none'>
  <EmailIcon color='gray.300' />
</InputLeftElement>
    )}
    <Input
      key={field.key}
      placeholder={field.label}
      size="lg"
      width="40rem"
      required={field.required}
      type={field.type === 'number' ? 'number' : (field.type === 'email' ? 'email' : 'text')}
      inputMode={field.type === 'number' ? 'numeric' : (field.type === 'email' ? 'email' : 'text')}
      onChange={(e) => handleInputChange(field.key, e.target.value)}
      maxLength={field.key === 'workPhone' ? 10 : field.key === 'mobilePhone' ? 10 : field.key == 'asstPhone' ? 10 : undefined}
    />
                    </InputGroup>
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
      </div>
    </>
  );
}
