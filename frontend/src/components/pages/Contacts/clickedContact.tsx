import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
import { deleteRecordFunction } from "../deleteRecord.js";
import "./contacts.css";
const backendURL = 'http://localhost:3000'; 

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
  { label: 'Email', key: 'Email', type: 'text',className:'email' },
  { label: 'Phone', key: 'WorkPhone', type: 'text' },
  { label: 'Mobile', key: 'MobilePhone', type: 'text' },
  { label: 'Department', key: 'Department', type: 'text' },
];

const detailsSections = [
  [
    { label: 'Account Name', key: 'AccountName', type: 'text' },
    { label: 'Email', key: 'Email', type: 'text', className:'email' },
    { label: 'Work Phone', key: 'WorkPhone', type: 'text' },
    { label: 'Mobile Phone', key: 'MobilePhone', type: 'text' },
    { label: 'Fax', key: 'Fax', type: 'text' },
    { label: 'Assistant Name', key: 'AssistantName', type: 'text' },
  ],
  [
    { label: 'Contact Name', key: 'FirstName', type: 'text' },
    { label: 'Department', key: 'Department', type: 'text' },
    { label: 'Title', key: 'Title', type: 'text' },
    { label: 'Assistant Phone', key: 'AssistantPhone', type: 'text' },
  ],
];

export default function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialContact = location.state.contact;
  const [contact, setContact] = useState(initialContact);
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emailSubject,setEmailSubject] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const goBack = () => {
    navigate(-1);
  };

  const toggleVisibility = () => { 
    setIsVisible(!isVisible);
  };

  const deleteRecord = () => {
    deleteRecordFunction('Contact', 'deleteContact', initialContact.ContactID)
      .then(goBack())
      .catch((error:any) => console.error('Error deleting record:', error));
  };


  const [editingFieldIndex, setEditingFieldIndex] = useState(null);

  const changeEditMode = (index:any) => {
    setEditingFieldIndex((prevIndex) => (prevIndex === index ? null : index));

  };

const saveRecordChange = () => {
  console.log(contact);
  fetch(`${backendURL}/Contact/updateContact`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      updatedContactData: contact,
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
const cancelEdit = () => {
  setEditingFieldIndex(null);
  setContact(initialContact);
};


  const renderField = (label:string, key:string, type:any, index:any,  inputClass?:any) => (

    <li className='overviewDetail' key={key}>
      {label}
      <span className={`detail`}>
        {editingFieldIndex === index ? (
          <div className='flex items-center'>
            <input
              type={type}
              value={contact[key] || ''}
              onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
              className={`${inputClass} p-2 editInput rounded-md`}
            />
            <div className="editBtns flex gap-3">
              <p onClick={()=> saveRecordChange()}>✅</p>
              <p onClick={() => cancelEdit()}>x</p>
            </div>
          </div>
        ) : (
          <span>{contact[key] || '—'}</span>
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
    const toEmail = [contact.Email];
    const backendURL = 'http://localhost:3000'; 

    sendEmail(toEmail, null, backendURL, emailSubject, emailMsg, emailFile, onClose);
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
                    {contact.Email}
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
          <h1>{contact.FirstName} {contact.LastName}</h1>
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
      <h1 className='font-bold pb-4'>Contact Information</h1>
        <ul className='flex flex-col gap-6 overviewDetails-header'>
          {contactFields.map((field, index) => renderField(field.label, field.key, field.type, index, field.className ))}
        </ul>
      </div>

      <div className='allDetails'>

        <div className='showDetails'>
          <button onClick={toggleVisibility}>{isVisible ? 'Hide Details' : 'Toggle Details'}</button>
        </div>
        <div className={`allDetails-list ${isVisible ? 'visible' : ''}`}>
        <h1 className='font-bold details-header'>Contact Details</h1>
        <div className='detail-list-container'>
          {detailsSections.map((section, index) => (
            <ul className='allDetails-col' key={index}>
              {section.map((field, index) => renderField(field.label, field.key, field.type, index, field.className || ''))}
            </ul>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
