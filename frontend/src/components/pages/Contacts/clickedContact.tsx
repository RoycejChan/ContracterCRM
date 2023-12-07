import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
import { deleteRecordFunction } from "../deleteRecord.js";
import "./contacts.css"


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
  


  const renderField = (label:string, key:string, type:any, inputClass?:any) => (

    <li className='overviewDetail' key={key}>
      {label}
      <span className={`detail`}>
        <input
          type={type}
          value={contact[key] || '—'}
          onChange={() => {}}
          className={`${inputClass}`}
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
      <h1 className='font-bold pb-4'>Contact Information</h1>
        <ul className='flex flex-col gap-6 overviewDetails-header'>
          {contactFields.map((field) => renderField(field.label, field.key, field.type, field.className))}
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
              {section.map((field) => renderField(field.label, field.key, field.type, field.className || ''))}
            </ul>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
