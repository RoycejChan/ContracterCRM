import { useState } from 'react';
import CreateNewNav from "../createNav/createNav";
import "./newContact.css";
import { Input } from '@chakra-ui/react';
import { Stack } from "@chakra-ui/react";
import pfp from "../../../assets/otherpfp.png";

export default function CreateContact() {
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    accountName: '',
    email: '',
    workPhone: '',
    mobilePhone: '',
    assistantName: '',
    title: '',
    department: '',
    fax: '',
    dob: '',
    asstPhone: ''
  });

  const backendURL = 'http://localhost:3000';

  async function check() {
    try {
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
      console.log("hello");
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  

  const inputFields = [
    { label: 'First Name', key: 'firstName', required: true },
    { label: 'Last Name', key: 'lastName', required: true },
    { label: 'Account Name', key: 'accountName', required: true },
    { label: 'Email', key: 'email' },
    { label: 'Work Phone', key: 'workPhone' },
    { label: 'Mobile Phone', key: 'mobilePhone', required: true },
    { label: 'Assistant Name', key: 'assistantName' },
    { label: 'Title', key: 'title', required: true },
    { label: 'Department', key: 'department', required: true },
    { label: 'Fax', key: 'fax' },
    { label: 'Date of Birth', key: 'dob', type: 'date' },
    { label: 'Asst Phone', key: 'asstPhone' }
  ];

  const handleInputChange = (field:any, value:any) => {
    setContactInfo(prevInfo => ({ ...prevInfo, [field]: value }));
  };


  return (
    <>
      <CreateNewNav page="Contact" />

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
                    size='lg'
                    width="40rem"
                    required={field.required}
                    type={field.type}
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
                    size='lg'
                    width="40rem"
                    required={field.required}
                    type={field.type}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                ))}
              </Stack>
            </div>
            <button onClick={()=>{check()}}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
