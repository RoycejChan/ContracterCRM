import  { useState } from 'react';
import CreateNewNav from '../createNav/createNav';
import pfp from '../../../assets/otherpfp.png';
import './newContact.css';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { PhoneIcon , EmailIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
interface ContactInfo {
  firstName: string;
  lastName: string;
  accountName: string;
  email: string;
  workPhone: string | null;
  mobilePhone: string | null;
  assistantName: string;
  title: string;
  department: string;
  fax: number | null;
  asstPhone: string | null;
}


export default function CreateContact() {
    const navigate = useNavigate();


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


  const formatPhoneNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
  };

  const save = async () => {
    try {
      // Validate required fields
      const requiredFields = inputFields.filter((field) => field.required);
  
      for (const field of requiredFields) {
        if (!contactInfo[field.key as keyof ContactInfo]) {
          alert(`${field.label} is required.`);
          return;
        }
      }
      
      //!IDk Validate email format, 
      const emailField = inputFields.find((field) => field.key === 'email');
      const email = contactInfo.email;
      if (emailField && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        console.error('Invalid email format.');
        return;
      }
  
    //!IDk Format phone numbers idk
    const formattedWorkPhone = formatPhoneNumber(contactInfo.workPhone || '');
    const formattedMobilePhone = formatPhoneNumber(contactInfo.mobilePhone || '');
    const formattedAsstPhone = formatPhoneNumber(contactInfo.asstPhone || '');

    const updatedContactInfo = {
      ...contactInfo,
      workPhone: formattedWorkPhone,
      mobilePhone: formattedMobilePhone,
      asstPhone: formattedAsstPhone,
    };
    console.log('Before fetch');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/Contact/newContact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newContact: updatedContactInfo })
      })
        ///wont log dont know why
      console.log("After fetch"); 
      await response.json();

        } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };



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

<div key={field.key} className={`form-control-container ${field.required ? 'requiredLabel' : ''}`}>
                    <FormControl isRequired={field.required} className='flex'>
                    <FormLabel></FormLabel>
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
      pattern={field.key === 'workPhone' ? '[0-9]{3}-[0-9]{2}-[0-9]{4}' : undefined}
    />
                    </InputGroup>
                    </FormControl>
                    </div>


  ))}
</Stack>
              </div>
              <div className="input-container">
              <Stack spacing={6}>
              {inputFields.slice(6).map((field) => (
                              <div key={field.key} className={`form-control-container ${field.required ? 'requiredLabel' : ''}`}>
                <FormControl isRequired={field.required} className='flex'>
                  <FormLabel id='formlabel'></FormLabel>
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
    </FormControl>
    </div>
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
