import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
const backendURL = 'http://localhost:3000'; 
import './tasks.css'
import PageNav from "../../navigation/PageNav/PageNav";
import { deleteRecordFunction } from "../deleteRecord.js"
import { clearSelectedFunction } from "../clearSelection.js";
import { handleCheckboxClickFunction } from "../handleCheckboxClick.js"

interface Task {
  TaskID:number;
  Subject:string;
  Priority:string;
  Status:string;
  Description:string;
  Location:string;
  DueDateTime:string;
  Account:string;
  Service:string;
  Manager:string;
}

export default function Tasks() {
  const navigate = useNavigate();

  const [Tasks, setTasks] = useState<Task[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Task/Tasks?limit=${recordsPerPage}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const [data] = await response.json();
          setTasks(data);
      } catch (error) {
        console.error('Error fetching Tasks:', error);
      }
    };

    fetchData();
  }, [recordsPerPage]);

//button to toggle filter sidebar
const toggleSidebar = () => {setIsSidebarOpen((prev) => !prev);};

//button to create new record
const createNew = () => {navigate('/createTask');}

//Handles UI change when a record is clicked
const handleCheckboxClick = (record:any, event:any) => {
  const checkbox = event.target;
  const listItem = checkbox.closest('.record');
  handleCheckboxClickFunction(record, checkbox, listItem, setIsCheckboxChecked, setCheckedRecords);
  setSelectAll(false); 
};

//CHANGES THE AMOUNT OF RECORDS DISPLAYED
const handleRecordsPerPageChange = (value: string) => {setRecordsPerPage(value)};

//DELETE SELECTED RECORD(s)
const deleteRecord = async () => {
    await deleteRecordFunction('Task', 'deleteTask', checkedRecords)
    .then(window.location.reload())
    .catch((error:any) => console.error('Error deleting record:', error));
};


//CLEAR CHECK SELECTED RECORD(s)
const clearSelected = () => {
  clearSelectedFunction(); 
  setIsCheckboxChecked(false);
  setCheckedRecords([]);
  setSelectAll(false);
};

//navigates to clicked record
const navTo = (contact:any) => {
  navigate('/clickedContact', {state:{contact}})
}

const handleSelectAll = () => {
  setSelectAll((prev) => !prev);
  setIsCheckboxChecked(!selectAll);
  setCheckedRecords(selectAll ? [] : Tasks.map((Task) => Task.TaskID));
};





  return (
    <>
          <div className="pageNavTop">

{/* !!MODAL CHAKRA UI FOR ADD TASK */}
  {isCheckboxChecked 
  ? 
  // THIS SHOWS WHEN A RECORD IS CLICKED, THESE ARE THE FUNCTION THAT CAN BE DONE WITH IT
  <>
        <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons" onClick={()=>deleteRecord()}>
          Delete
        </Button>
  </>
  : 
  <>
  <Button onClick={()=>toggleSidebar()} size='lg' variant='outline' className="filterToggle">
      FILTER
    </Button>
    <Button colorScheme='twitter' size='lg' onClick={createNew}>
      Create Task
    </Button >
  </>
  }

  </div>

  <PageNav amount={Tasks.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected}/>

      <div className="tasks records">
      { isSidebarOpen ? 
       <div className="sidebar"> <h1>FILTER</h1></div> 
       : 
       <></> }
       <div className="mainContent">
      <ul className="record-headers" id="task-longer-headers">
        <li id="first-header">
        {Tasks.length != 0 ? <input
              type="checkbox"
              className="checkItem"
              checked={selectAll}
              onChange={handleSelectAll}
            /> 
            :<></>}
            Subject</li>
        <li>Due Date</li>
        <li>Status</li>
        <li>Priority</li>
        <li>Related To</li>
        <li>Manager</li>
      </ul>
      <ul className="record-list">
        {Tasks.map(Task => (
          <li key={Task.TaskID} className={`flex gap-3 task record ${checkedRecords.includes(Task.TaskID) ? 'selected' : ''}`} onClick={()=>navTo(Task)}>
              <p>
                <input type="checkbox" className="checkItem" 
                checked={selectAll || checkedRecords.includes(Task.TaskID)}
                onClick={(event) => {
                  // Stops the onClick function in the parent LI from happening
                  event.stopPropagation();
                  handleCheckboxClick(Task.TaskID, event);
                }}>
                </input>
              {Task.Subject}</p>
            <p>{Task.DueDateTime}</p>
            <p>{Task.Status}</p>
            <p>{Task.Priority}</p>
            <p>{Task.Account}</p>
            <p>{Task.Manager}</p>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </>
  );
}
