import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
const backendURL = 'http://localhost:3000';

const contactFields = [
  { label: 'Email', key: 'Email', type: 'text' },
  { label: 'Phone', key: 'WorkPhone', type: 'text' },
  { label: 'Mobile', key: 'MobilePhone', type: 'text' },
  { label: 'Department', key: 'Department', type: 'text' },
];

const detailsSections = [
  [
    { label: 'Account Name', key: 'AccountName', type: 'text' },
    { label: 'Email', key: 'Email', type: 'text' },
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

  const goBack = () => {
    navigate(-1);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const deleteRecord = async () => {
    try {
      const response = await fetch(`${backendURL}/Contact/deleteContact`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordsToDelete: contact.ContactID }),
      });

      if (response.ok) {
        console.log('Contacts deleted successfully');
        goBack();
      } else {
        console.error('Error deleting contacts:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting contacts:', error);
    }
  };


  const renderField = (label:string, key:string, type:any) => (
    <li className='overviewDetail' key={key}>
      {label}
      <span className={`${type} detail`}>
        <input
          type={type}
          value={contact[key] || '—'}
        />
        <span className='detailIcon'>✏️</span>
      </span>
    </li>
  );

  return (
    <>
      <div className='contactPageHeader'>
        <div className='leftSide-contactPageHeader'>
          <button onClick={goBack} className='backBtn'>
            ⬅️
          </button>
          <h1>{contact.FirstName} {contact.LastName}</h1>
        </div>
        <div className='rightSide-contactPageHeader'>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='twitter' variant='solid' size='lg' className='filterButtons'>
              Send Email
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className='filterButtons' onClick={deleteRecord}>
              Delete
            </Button>
          </Stack>
        </div>
      </div>

      <div className='overviewDetails'>
        <ul className='flex flex-col gap-6 overviewDetails-header'>
          {contactFields.map((field) => renderField(field.label, field.key, field.type))}
        </ul>
      </div>

      <div className='allDetails'>
        <div className='showDetails'>
          <button onClick={toggleVisibility}>{isVisible ? 'Hide Details' : 'Toggle Details'}</button>
        </div>
        <div className={`allDetails-list ${isVisible ? 'visible' : ''}`}>
          {detailsSections.map((section, index) => (
            <ul className='allDetails-col' key={index}>
              {section.map((field) => renderField(field.label, field.key, field.type))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
