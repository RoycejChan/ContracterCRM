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
    try {
      const requiredFields = inputFields.filter((field) => field.required);
      console.log(TaskInfo);
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
       await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const inputFields = [
    { label: 'Task Name', key: 'TaskName', required: true },
    { label: 'Due Date', key: 'DueDate', required: true, type:'date'},
    { label: 'Status', key: 'Status', required: true, type:'select', options:['Not Started','Deffered','In Progress', 'Completed', 'Waitng For Input'] },
    { label: 'Priority', key: 'Priority', required: true, type:'select', options:['Low','Mid','High','Highest'] },
    { label: 'Service Type', key: 'Service', required: true},
    { label: 'Related To', key: 'Company', required: true },
    { label: 'Location', key: 'Location', required: true },
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

  const renderInputField = (field: any) => {
    if (field.type === 'select') {
      return (
        <select
          key={field.key}
          required={field.required}
          onChange={(e) => handleInputChange(field.key as TaskInfoKey, e.target.value)}
        >
          <option value="" disabled selected>
            {field.label}
          </option>
          {field.options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <Input
          key={field.key}
          placeholder={field.label}
          size="lg"
          width="40rem"
          required={field.required}
          type={field.type === 'date' ? 'date' : 'text'}
          inputMode={field.type === 'number' ? 'numeric' : 'text'}
          onChange={(e) => handleInputChange(field.key as TaskInfoKey, e.target.value)}
        />
      );
    }
  };

  const renderInputFields = (fields: any[]) => {
    return fields.map((field) => renderInputField(field));
  };
  
  
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save(); 
  };


  return (
    <>
    <div className="background">
      <form onSubmit={handleSubmit}>
        <CreateNewNav page="Task" onButtonClick={save} />

        <div className="new-container pt-10">
          <div className="newTask">
            <h1 className="text-2xl mb-4">Task Information</h1>
            <div className="newTaskInfo flex justify-between">
              <div className="input-container">
                <Stack spacing={6}>
                  {renderInputFields(inputFields.slice(0, 6))}
                </Stack>
              </div>
              <div className="input-container">
                <Stack spacing={6}>
                  {renderInputFields(inputFields.slice(6))}
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
