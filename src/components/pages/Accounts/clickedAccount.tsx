import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { sendEmail } from "../sendEmail.js"

const contactFields = [
  { label: 'AccountName', key: 'AccountName', type: 'text' },
  { label: 'Website', key: 'AccountSite', type: 'text' },
  { label: 'Industry', key: 'Industry', type: 'text' },
  { label: 'Email', key: 'Email', type: 'text', className:'email' },
];

const detailsSections = [
  [
    { label: 'Account Name', key: 'AccountName', type: 'text' },
    { label: 'Email', key: 'Email', type: 'text', className:'email' },
    { label: 'Account Website', key: 'AccountSite', type: 'text' },
    { label: 'Fax', key: 'Fax', type: 'text' },
  ],
  [
    { label: 'Industry', key: 'Industry', type: 'text' },
    { label: 'Annual Revenue', key: 'AnnualRevenue', type: 'text' },
    { label: 'Front Desk Phone', key: 'FrontDeskPhone', type: 'text' },
  ],

];

const detailsSectionAddress = [
  [
    { label: 'City', key: 'City', type: 'text' },
    { label: 'Street', key: 'Street', type: 'text' },
  ],
  [
    { label: 'State', key: 'State', type: 'text' },
    { label: 'Zip', key: 'Zip', type: 'text' },
    { label: 'Country', key: 'Country', type: 'text' },
  ],
];

export default function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialAccount = location.state.account;

  const [account, setAccount] = useState(initialAccount);
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emailSubject,setEmailSubject] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const goBack = () => {navigate(-1);};

  const toggleVisibility = () => {setIsVisible(!isVisible);};

  const deleteRecord = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/Account/deleteAccount`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordsToDelete: initialAccount.AccountID }),
      });

      if (response.ok) {
        goBack();
      } else {
        console.error('Error deleting contacts:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting contacts:', error);
    }
  };
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);

  const changeEditMode = (index: number) => {
    setEditingFieldIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const cancelEdit = () => {
    setEditingFieldIndex(null);
    setAccount(initialAccount);
  };

const saveRecordChange = () => {
  console.log(account);
  fetch(`${import.meta.env.VITE_BACKEND_URL}/Account/updateAccount`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      updatedAccountData: account,
    }),
  })
    .then(response => {

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      setEditingFieldIndex(null);
      console.log('Changes saved successfully');
    })
    .catch(error => {
      console.error('Error saving changes:', error);
    });
}


 const renderField = (label:string, key:string, type:'text', index:number, inputClass?:any) => (

  <li className='overviewDetail' key={key}>
  {label}
<span className={`detail`}>
        {editingFieldIndex === index ? (
          <div className='flex items-center'>
            <input
              type={type}
              value={account[key] || ''}
              onChange={(e) => setAccount({ ...account, [key]: e.target.value })}
              className={`${inputClass} p-2 editInput rounded-md`}
            />
            <div className="editBtns flex gap-3">
              <p onClick={()=> saveRecordChange()}>✅</p>
              <p onClick={() => cancelEdit()}>x</p>
            </div>
          </div>
        ) : (
          <span>{account[key] || '—'}</span>
        )}
        {editingFieldIndex !== index && (
          <span className='detailIcon cursor-pointer' onClick={() => changeEditMode(index)}>
            ✏️
          </span>
        )}
      </span>
    </li>
  );


  
  const [emailFile, setEmailFile] = useState<File | null>(null);


  const uploadFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      setEmailFile(files[0]);
    } else {
      setEmailFile(null);
    }
  };

  const sendEmailFunction = () => {
    const toEmail = [account.Email];

    sendEmail(toEmail, null, emailSubject, emailMsg, emailFile, onClose);
  };

  return (
    <>

<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered size="xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Contact Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody className="flex flex-col gap-4">

        <h1>From: <span className="email"> CRMCompanyEmail.com</span></h1>

        <div className="flex overflow-scroll overflow-y-hidden pb-2">
        <h1>To:</h1>

                  <p className="bg-gray-200 rounded-md inline-block px-2 whitespace-nowrap ml-2">
                    {account.Email}
                  </p>
        </div>
  
        <label htmlFor="emailSubject" className="-mb-4 font-bold">Subject:</label>
        <Input variant='flushed' name="emailSubject" onChange={(e)=>setEmailSubject(e.target.value)}/>
        <label htmlFor="emailMsg" className="font-bold">Message:</label>
        <Input variant='outline' name="emailMsg" onChange={(e)=>setEmailMsg(e.target.value)}/>
        <label htmlFor="file" className="font-bold">Attachment:</label>
        <Input type="file" name="file" onChange={(e) => uploadFile(e.target.files)} />

    </ModalBody>
    <ModalFooter>
      <Button colorScheme="gray" mr={3} onClick={onClose}>
        Close
      </Button>
      <Button colorScheme="twitter" onClick={()=>{sendEmailFunction()}}>Send 📫</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

      <div className='contactPageHeader'>
        <div className='leftSide-contactPageHeader'>
          <button onClick={goBack} className='backBtn'>
            ⬅️
          </button>
          <h1>{account.AccountName}</h1>
        </div>
        <div className='rightSide-contactPageHeader'>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='twitter' variant='solid' size='lg' className='filterButtons' onClick={onOpen}>
              Send Email
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className='filterButtons' onClick={deleteRecord}>
              Delete
            </Button>
          </Stack>
        </div>
      </div>

      <div className='overviewDetails'>
        <h1 className='font-bold pb-4'>Account Information</h1>
        <ul className='flex flex-col gap-6 overviewDetails-header'>
          {contactFields.map((field) => renderField(field.label, field.key, field.type, field.className))}
        </ul>
      </div>

      <div className='allDetails'>
        <div className='showDetails'>
          <button onClick={toggleVisibility}>{isVisible ? 'Hide Details' : 'Toggle Details'}</button>
        </div>


        <div className={`allDetails-list ${isVisible ? 'visible' : ''}`}>
        
        <div className='details-list-container'>
          <h1>Account Information</h1>
          <div className="details-list">
          {detailsSections.map((section, index) => (
            <ul className='allDetails-col' key={index}>
              {section.map((field, index) => renderField(field.label, field.key, field.type, index, field.className))}
            </ul>
          ))}
          </div>
          </div>

          
         <div className='details-list-container'>
          <h1>Address Information</h1>
          <div className="details-list">
          {detailsSectionAddress.map((section, index) => (
            <ul className='allDetails-col' key={index}>
            {section.map((field, index) => renderField(field.label, field.key, field.type,index))}
          </ul>
        ))}
        </div>
        </div>

        </div>
      </div>
    </>
  );
}
