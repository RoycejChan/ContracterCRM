import  { useState } from 'react';
import CreateNewNav from '../createNav/createNav';
import { Input, Stack} from '@chakra-ui/react';
import accountImage from '../../../assets/otherpfp.png';
import './newAccount.css';


interface AccountInfo {
  AccountName: string;
  AccountSite: string;
  Industry: string;
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

  const [AccountInfo, setAccountInfo] = useState<AccountInfo>({
    AccountName: '',
    AccountSite: '',
    Industry: '',
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

  const backendURL = 'http://localhost:3000';

  const save = async () => {
    console.log(AccountInfo);
    try {
      // Validate required fields
      const requiredFields = inputFields.filter((field) => field.required);
  
      for (const field of requiredFields) {
        if (!AccountInfo[field.key as AccountInfoKey]) {
          console.error(`${field.label} is required.`);
          return;
        }
      }
  
      const response = await fetch(`${backendURL}/Account/newAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newAccount: AccountInfo }),
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
    { label: 'Account Name', key: 'AccountName', required: true },
    { label: 'Account Website', key: 'AccountSite', required: true },
    { label: 'Industry', key: 'Industry', required: true },
    { label: 'Annual Revenue', key: 'AnnualRevenue', required: true, type:'number' },
    { label: 'Email', key: 'Email', required: true, type:'email' },
    { label: 'FrontDeskPhone', key: 'FrontDeskPhone', required: true, type:"number"},
    { label: 'Fax (optional)', key: 'Fax', type:"number"},
    { label: 'Street', key: 'Street', required: true },
    { label: 'City', key: 'City', required: true },
    { label: 'State', key: 'State', required: true},
    { label: 'Zip', key: 'Zip', type:"number" },
    { label: 'Country', key: 'Country', required: true },
  ];

  const handleInputChange = (field: AccountInfoKey, value: string) => {
    const sanitizedValue = value.trim() === '' ? null : value;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [field]: sanitizedValue,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save(); 
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <CreateNewNav page="Account" onButtonClick={save} />

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
    <Input
      key={field.key}
      placeholder={field.label}
      size="lg"
      width="40rem"
      required={field.required}
      type={field.type === 'number' ? 'number' : (field.type === 'email' ? 'email' : 'text')}
      inputMode={field.type === 'number' ? 'numeric' : (field.type === 'email' ? 'email' : 'text')}
      focusBorderColor='crimson'
      onChange={(e) => handleInputChange(field.key as AccountInfoKey, e.target.value)}
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
      onChange={(e) => handleInputChange(field.key as AccountInfoKey, e.target.value)}
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
