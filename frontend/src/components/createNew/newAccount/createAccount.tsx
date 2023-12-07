import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNewNav from '../createNav/createNav';
import { Input, InputGroup, InputLeftElement, Stack, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { PhoneIcon , EmailIcon, } from '@chakra-ui/icons'

import accountImage from '../../../assets/otherpfp.png';
import './newAccount.css';


interface AccountInfo {
  AccountName: string;
  AccountSite: string;
  Industry: string;
  Email:string;
  AnnualRevenue: number;
  FrontDeskPhone: number | null;
  Fax: number | null;
  Street: string;
  City: string;
  State: string;
  Zip: number;
  Country: string;
}



export default function CreateAccount() {
  const navigate = useNavigate();
  const [AccountInfo, setAccountInfo] = useState<AccountInfo>({
    AccountName: '',
    AccountSite: '',
    Industry: '',
    Email:'',
    AnnualRevenue: 0,
    FrontDeskPhone: null,
    Fax: null,
    Street: '',
    City: '',
    State: '',
    Zip: 0,
    Country: '',
  });
  type AccountInfoKey = keyof AccountInfo;

  const inputFields = [
    { label: 'Account Name', key: 'AccountName', required: true },
    { label: 'Account Website', key: 'AccountSite', required: true },
    { label: 'Industry', key: 'Industry', required: true },
    { label: 'Annual Revenue', key: 'AnnualRevenue', required: true, type:'number' },
    { label: 'Email', key: 'Email', required: true, type:'email' },
    { label: 'FrontDeskPhone', key: 'FrontDeskPhone', required: true, type:"tel"},
    { label: 'Fax (optional)', key: 'Fax', type:"number"},
    { label: 'Street', key: 'Street', required: true },
    { label: 'City', key: 'City', required: true },
    { label: 'State', key: 'State', required: true},
    { label: 'Zip', key: 'Zip', type:"number" },
    { label: 'Country', key: 'Country', required: true },
  ];

  const backendURL = 'http://localhost:3000';

  const save = async () => {
    try {
      // Validate required fields
      const requiredFields = inputFields.filter((field) => field.required);
  
      for (const field of requiredFields) {
        if (!AccountInfo[field.key as AccountInfoKey]) {
          console.error(`${field.label} is required.`);
          return;
        }
      }

      // Validate email format , idk
      const emailField = inputFields.find((field) => field.key === 'Email');
      const email = AccountInfo.Email;
      if (emailField && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        console.error('Invalid email format.');
        return;
      }

      const updatedAccountInfo = {
        ...AccountInfo,
        AccountSite: `https://${AccountInfo.AccountSite}.com`,
      };
  
      const response = await fetch(`${backendURL}/Account/newAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newAccount: updatedAccountInfo }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

// I also dont know
  const formatPhoneNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
  
    // Apply the desired phone number format
    const formattedPhoneNumber = numericValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
  
    return formattedPhoneNumber;
  };


  const handleInputChange = (field: AccountInfoKey, value: string) => {
    let sanitizedValue = value.trim() === '' ? null : value;
    if (field === 'FrontDeskPhone' && sanitizedValue) {
      // Format the phone number
      sanitizedValue = formatPhoneNumber(sanitizedValue);
    }
    setAccountInfo((prevInfo) => ({
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
        <CreateNewNav page="Account" onButtonClick={save} onCancel={cancel} />

        <div className="new-container">
          <div className="new-PFP">
            <h1 className="text-2xl">Account Image</h1>
            <div className="accountpfp">
              <img src={accountImage} alt="PFP" />
            </div>
          </div>
          <div className="newAccount">
            <h1 className="text-2xl mb-4">Account Information</h1>
            <div className="newAccountInfo flex justify-between">
              <div className="input-container">
              <Stack spacing={6}>
  {inputFields.slice(0, 6).map((field) => (
    <InputGroup key={field.key} size="lg" width="40rem">
      {field.key === 'AnnualRevenue' && (
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children='$'
        />
      )}

{field.key === 'AccountSite' && (
    <InputLeftAddon children='https://' />
      )}


      {field.key === 'FrontDeskPhone' && (
    <InputLeftElement pointerEvents='none'>
    <PhoneIcon color='gray.300' />
  </InputLeftElement>
      )}
            {field.key === 'Email' && (
    <InputLeftElement pointerEvents='none'>
    <EmailIcon color='gray.300' />
  </InputLeftElement>
      )}
      <Input
        placeholder={field.label}
        size="lg"
        required={field.required}
        type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
        inputMode={field.type === 'number' ? 'numeric' : field.type === 'email' ? 'email' : 'text'}
        focusBorderColor="crimson"
        onChange={(e) => handleInputChange(field.key as AccountInfoKey, e.target.value)}
        maxLength={field.key === 'FrontDeskPhone' ? 10 : undefined}
        />
      {field.key === 'AccountSite' && (
    <InputRightAddon children='.com' />
      )}
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
      onChange={(e) => handleInputChange(field.key as AccountInfoKey, e.target.value)}
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
