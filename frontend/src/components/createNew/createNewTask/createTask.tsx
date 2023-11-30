import  { useState } from 'react';
import CreateNewNav from '../createNav/createNav';
import { Input, Stack} from '@chakra-ui/react';
import './newTask.css';


interface TaskInfo {
  TaskName: string;
  DueDate: Date | null;
  Status: string;
  Priority: string;
  Company: string;
  Service: string;
  Location: string;
  Manager: string;
  Description: string;
}



export default function CreateTask() {

  const [TaskInfo, setTaskInfo] = useState<TaskInfo>({
    TaskName: '',
    DueDate: null,
    Status: '',
    Priority: '',
    Company: '',
    Service: '',
    Location: '',
    Manager: '',
    Description: '',
  });
  type TaskInfoKey = keyof TaskInfo;

  const backendURL = 'http://localhost:3000';

  const save = async () => {
    console.log(TaskInfo);
    try {
      const requiredFields = inputFields.filter((field) => field.required);
  
      for (const field of requiredFields) {
        if (!TaskInfo[field.key as TaskInfoKey]) {
          console.error(`${field.label} is required.`);
          return;
        }
      }
  
      const response = await fetch(`${backendURL}/Task/newTask`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTask: TaskInfo }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const inputFields = [
    { label: 'Task Name', key: 'TaskName', required: true },
    { label: 'Due Date', key: 'DueDate', required: true, type:'date'},
    { label: 'Status', key: 'Status', required: true },
    { label: 'Priority', key: 'Priority', required: true },
    { label: 'Service Type', key: 'Service', required: true},
    { label: 'Related To', key: 'Company', required: true },
    { label: 'TaskOwner', key: 'Manager', required: true },
    { label: 'Description', key: 'Description'},

  ];


  const handleInputChange = (field: TaskInfoKey, value: string) => {
    let sanitizedValue: string | Date | null = value.trim();
  
    if (field === 'DueDate') {
      sanitizedValue = sanitizedValue === '' ? null : new Date(sanitizedValue);
      if (sanitizedValue) {
        const formattedDate = sanitizedValue.toISOString().split('T')[0];
        sanitizedValue = formattedDate.replace(/-/g, ''); // Remove dashes
      }
    } else {
      sanitizedValue = sanitizedValue === '' ? null : sanitizedValue;
    }
  
    setTaskInfo((prevInfo) => ({
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
        <CreateNewNav page="Task" onButtonClick={save} />

        <div className="new-container">
          <div className="newTask">
            <h1 className="text-2xl mb-4">Task Information</h1>
            <div className="newTaskInfo flex justify-between">
              <div className="input-container">
              <Stack spacing={6}>
              {inputFields.slice(0, 6).map((field) => (
    <Input
      key={field.key}
      placeholder={field.label}
      size="lg"
      width="40rem"
      required={field.required}
      type={field.type === 'date' ? 'date' : 'text'}
      inputMode={field.type === 'number' ? 'numeric' : (field.type === 'email' ? 'email' : 'text')}
      focusBorderColor='crimson'
      onChange={(e) => handleInputChange(field.key as TaskInfoKey, e.target.value)}
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
      inputMode={field.type === 'number' ? 'numeric': 'text'}
      onChange={(e) => handleInputChange(field.key as TaskInfoKey, e.target.value)}
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
