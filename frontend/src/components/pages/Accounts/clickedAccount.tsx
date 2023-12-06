import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
const backendURL = 'http://localhost:3000';

const contactFields = [
  { label: 'AccountName', key: 'AccountName', type: 'text' },
  { label: 'AccountSite', key: 'AccountSite', type: 'text' },
  { label: 'Industry', key: 'Industry', type: 'text' },
  { label: 'Email', key: 'Email', type: 'text' },
];

const detailsSections = [
  [
    { label: 'Account Name', key: 'AccountName', type: 'text' },
    { label: 'Email', key: 'Email', type: 'text' },
    { label: 'Account Website', key: 'AccountSite', type: 'text' },
    { label: 'Fax', key: 'Fax', type: 'text' },
  ],
  [
    { label: 'Industry', key: 'Industry', type: 'text' },
    { label: 'Annual Revenue', key: 'AnnualRevenue', type: 'text' },
    { label: 'FrontDesk Phone', key: 'FrontDeskPhone', type: 'text' },
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

  const goBack = () => {navigate(-1);};

  const toggleVisibility = () => {setIsVisible(!isVisible);};

  const deleteRecord = async () => {
    try {
      const response = await fetch(`${backendURL}/Account/deleteAccount`, {
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


  const renderField = (label:string, key:string, type:any) => (
    <li className='overviewDetail' key={key}>
      {label}
      <span className={`${type} detail`}>
        <input
          type={type}
          value={account[key] || '—'}
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
          <h1>{account.AccountName}</h1>
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
        
        <div className='details-list-container'>
          <h1>Account Information</h1>
          <div className="details-list">
          {detailsSections.map((section, index) => (
            <ul className='allDetails-col' key={index}>
              {section.map((field) => renderField(field.label, field.key, field.type))}
            </ul>
          ))}
          </div>
          </div>

          
         <div className='details-list-container'>
          <h1>Address Information</h1>
          <div className="details-list">
          {detailsSectionAddress.map((section, index) => (
            <ul className='allDetails-col' key={index}>
            {section.map((field) => renderField(field.label, field.key, field.type))}
          </ul>
        ))}
        </div>
        </div>

        </div>
      </div>
    </>
  );
}
