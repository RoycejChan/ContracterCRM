import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
import { deleteRecordFunction } from "../deleteRecord.js";


const TaskFields = [
  { label: 'Subject', key: 'Subject', type: 'text' },
  { label: 'Due Date', key: 'DueDateTime', type: 'text' },
  { label: 'Priority', key: 'Priority', type: 'text' },
  { label: 'Status', key: 'Status', type: 'text' },
];

const detailsSections = [
  [
    { label: 'Service Type', key: 'Service', type: 'text' },
    { label: 'Related To', key: 'Account', type: 'text'},
    { label: 'Manager', key: 'Manager', type: 'text' },
    { label: 'Description', key: 'Description', type: 'textarea' },
  ],
  [
    { label: 'Subject', key: 'Subject', type: 'text' },
    { label: 'Due Date', key: 'DueDateTime', type: 'text' },
    { label: 'Priority', key: 'Priority', type: 'text' },
    { label: 'Status', key: 'Status', type: 'text' },
  ],

  // [
  //   { label: 'Task Name', key: 'FirstName', type: 'text' },
  //   { label: 'Department', key: 'Department', type: 'text' },
  //   { label: 'Title', key: 'Title', type: 'text' },
  //   { label: 'Assistant Phone', key: 'AssistantPhone', type: 'text' },
  // ],
];

export default function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTask = location.state.Task;
  const [Task, setTask] = useState(initialTask);
  const [isVisible, setIsVisible] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const toggleVisibility = () => { 
    setIsVisible(!isVisible);
  };

  const deleteRecord = () => {
    deleteRecordFunction('Task', 'deleteTask', initialTask.TaskID)
      .then(goBack())
      .catch((error:any) => console.error('Error deleting record:', error));
  };
  


  const renderField = (label:any, key:any, type:any) => {
    const getPriorityClass = () => {
      if (key === 'Priority') {
        return Task.Priority === 'Low' ? 'Low' : Task.Priority === 'Mid' ? 'Mid' : Task.Priority === 'High' ? 'High' : Task.Priority === 'Highest' ? 'Highest' : '';
      }
      if (key === 'Status') {
        return Task.Status === 'In Progress' ? 'Inprogress' : Task.Status === 'Completed' ? 'Completed' : Task.Status === 'Deffered' ? 'Deffered' : Task.Status === 'Not Started' ? 'NotStarted' : Task.Status === 'Waiting For Input' ? 'Waiting-for-input' : "";
      }
      return '';
    };
  
    return (
      <li className={`overviewDetail ${getPriorityClass()}`} key={key}>
        {label}
        <span className={`detail`}>
          <input
            type={type}
            value={key === 'DueDateTime' ? formatDate(Task[key]) : Task[key] || '—'}
            onChange={() => {}}
            id={getPriorityClass()}
          />
          <span className='detailIcon'>✏️</span>
        </span>
      </li>
    );
  };
  
  const formatDate = (dateString:any) => {
    return new Date(dateString)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\//g, '-');
  };





  return (
    <>
      <div className='contactPageHeader'>
        <div className='leftSide-contactPageHeader'>
          <button onClick={goBack} className='backBtn'>
            ⬅️
          </button>
          <h1>{Task.Subject}</h1>
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
      <h1 className='font-bold pb-4'>Task Information</h1>
        <ul className='flex flex-col gap-6 overviewDetails-header'>
          {TaskFields.map((field) => renderField(field.label, field.key, field.type))}
        </ul>
      </div>

      <div className='allDetails'>

        <div className='showDetails'>
          <button onClick={toggleVisibility}>{isVisible ? 'Hide Details' : 'Toggle Details'}</button>
        </div>
        <div className={`allDetails-list ${isVisible ? 'visible' : ''}`}>
        <h1 className='font-bold details-header'>Task Details</h1>
        <div className='detail-list-container'>
          {detailsSections.map((section, index) => (
            <ul className='allDetails-col' key={index}>
              {section.map((field) => renderField(field.label, field.key, field.type))}
            </ul>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

 