import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import './tasks.css'
import PageNav from "../../navigation/PageNav/PageNav";

// @ts-ignore

import { deleteRecordFunction } from "../deleteRecord.js"

// @ts-ignore

import { clearSelectedFunction } from "../clearSelection.js";
// @ts-ignore

import { handleCheckboxClickFunction } from "../handleCheckboxClick.js"
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
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

const filters = [
  'Subject',
  'Priority',
  'Status',
  'Description',
  'Location',
  'DueDateTime',
  'Account',
  'Service',
  'Manager',
,
]


export default function Tasks() {
  const navigate = useNavigate();

  const [Tasks, setTasks] = useState<Task[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const[unfilter, setfilter] = useState<boolean>(false);

  const[column, setColumn] = useState('');
  const[rank, setRank] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      console.log(import.meta.env.VITE_BACKEND_URL.replace(/\/$/, ''));
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/Task/Tasks?limit=${recordsPerPage}&page=${currentPage}&column=${column}&rank=${rank}`, {
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
  }, [recordsPerPage, currentPage, rank, unfilter]);

//button to toggle filter sidebar
const toggleSidebar = () => {setIsSidebarOpen((prev) => !prev);};

//button to create new record
const createNew = () => {navigate('/createTask');}

//Handles UI change when a record is clicked
const handleCheckboxClick = (record:number, event:any) => {
  const checkbox = event.target;
  const listItem = checkbox.closest('.record');
  handleCheckboxClickFunction(record, checkbox, listItem, setIsCheckboxChecked, setCheckedRecords);
  setSelectAll(false); 
};

//CHANGES THE AMOUNT OF RECORDS DISPLAYED
const handleRecordsPerPageChange = (value: string) => {setRecordsPerPage(value)};

//DELETE SELECTED RECORD(s)
const deleteRecord = async () => {
  console.log(checkedRecords);
    await deleteRecordFunction('Task', 'deleteTask', checkedRecords)
    .then(window.location.reload())
    .catch((error:Error) => console.error('Error deleting record:', error));
};


//CLEAR CHECK SELECTED RECORD(s)
const clearSelected = () => {
  clearSelectedFunction(); 
  setIsCheckboxChecked(false);
  setCheckedRecords([]);
  setSelectAll(false);
};

//navigates to clicked record
const navTo = (Task:Task) => {
  navigate('/clickedTask', {state:{Task: Task}})
}

const handleSelectAll = () => {
  setSelectAll((prev) => !prev);
  setIsCheckboxChecked(!selectAll);
  setCheckedRecords(selectAll ? [] : Tasks.map((Task) => Task.TaskID));
};



const isDueTomorrow = (dueDateTime:string) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dueDate = new Date(dueDateTime);
  
  return (
    dueDate.getDate() === tomorrow.getDate() &&
    dueDate.getMonth() === tomorrow.getMonth() &&
    dueDate.getFullYear() === tomorrow.getFullYear()
  );
};

const isDueToday = (dueDateTime:string) => {
  const today = new Date();
  const dueDate = new Date(dueDateTime);
  
  return (
    dueDate.getDate() === today.getDate() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate <= today
  );
};

const isPastDue = (dueDateTime:string) => {
  const today = new Date();
  const dueDate = new Date(dueDateTime);
  
  return dueDate.getDate() < today.getDate(); // Only returns true if it's in the past
};

const nextPage = () => {

  console.log("next");
  console.log(currentPage)
  setCurrentPage(currentPage + 1);
}

const prevPage = () => {
  console.log("prev");
  console.log(currentPage)

  if (currentPage == 1) {
    return;
  } else {
  setCurrentPage(currentPage -1);
  }}


  const rankFilter = (column:string, rankBy:string) => {
    setColumn(column);
    setRank(rankBy);
    console.log(column);
    console.log(rank);
  }


//handles dropdown for each filter
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const toggleDropdown = (dropdownKey: string) => {
  setFilterQuery('');
  setOpenDropdown((prevDropdown) => (prevDropdown === dropdownKey ? null : dropdownKey));
};

const [filterQuery, setFilterQuery] = useState('');
const [sqlFilter, setSqlFilter] = useState('is');


const filterRecords = async () => {
  try {
    let filterCondition = '';

    switch (sqlFilter) {
      case 'is':
        filterCondition = `${filterQuery}%`;
        break;
      case 'contains':
        filterCondition = `%${filterQuery}%`;
        break;
      case 'startsWith':
        filterCondition = `${filterQuery}%`;
        break;
      case 'endsWith':
        filterCondition = `%${filterQuery}`;
        break;
      case 'isEmpty': 
        filterCondition = `${openDropdown}`;
        break;
      default:
        break;
    }

    console.log(filterCondition);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/Task/Tasks?limit=${recordsPerPage}&page=${currentPage}&column=${column}&rank=${rank}&filterCondition=${filterCondition}&filterColumn=${openDropdown}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const [data] = await response.json();
    setTasks(data);
    console.log(data);

  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
};

useEffect(() => {
  console.log(sqlFilter);
}, [sqlFilter]);

const clearFilter = () => { 
  setSqlFilter('');
  setFilterQuery('');
  setOpenDropdown(null);
  setfilter((prevFilter) => !prevFilter);
}


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

  <PageNav amount={Tasks.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected}
          nextPageClick={nextPage} prevPageClick={prevPage}
          />

      <div className="tasks records">

            {/* Filter Bar */}
            {isSidebarOpen ? (
  <div className="sidebar">
    <div className="insidePadding p-6 overflow-y-scroll no-scrollbar">
    <h1 className="font-bold text-center text-xl">Filter Accounts By</h1>
    <h1 className="font-bold my-3 text-lg">Filter By Field</h1>


    {filters.map((filterName) => (
  <div className="flex gap-2 p-1 text-md flex-col overflow-y-clip" key={filterName}>

    <div className="flex gap-2 p-1">
      <input
        type="checkbox"
        name={filterName}
        onChange={() => toggleDropdown(`${filterName}`)}
        checked={openDropdown === filterName}
      />
      <label htmlFor={filterName}>{filterName}</label>
    </div>

    {openDropdown === filterName && (
      <div className="selectDropDown">
        <Select name="" id="" size="sm" onChange={(e)=>setSqlFilter(e.target.value)}>
          <option value="is">is</option>
          <option value="contains">contains</option>
          <option value="startsWith">starts with</option>
          <option value="endsWith">ends with</option>
          <option value="isEmpty">is empty</option>
        </Select>
        {sqlFilter == 'isEmpty' 
          ? <></> 
          : 
          <Input type="text" placeholder="Type Here" onChange={(e)=>setFilterQuery(e.target.value)}/>
        }
      </div>
    )}
  </div>
))}
</div>
  
<div className="filterFooter w-full items-center flex gap-4 justify-start p-2 border-t-2 h-24">
<Button colorScheme="telegram" width='130px' size="lg" onClick={()=>filterRecords()}>Apply Filter</Button>
<Button colorScheme="gray" width='130px'  size="lg" onClick={()=>clearFilter()}>Clear</Button>
</div>
  </div>
) : (
  <></>
)}





       <div className={`mainContent text-xs ${isSidebarOpen ? 'withSidebar' : ''}`} id="mainContent-tasks">
      <div className="record-headers-wrapper ">
      <ul className="record-headers" id="task-longer-headers">
        <li id="firstRecordTask" className="flex items-center">
        {Tasks.length != 0 ? <input
              type="checkbox"
              className="checkItem"
              checked={selectAll}
              onChange={handleSelectAll}
            /> 
            :<></>}
            Subject
            <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('Subject',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
            </li>
        <li className="flex items-center">
          Due Date
          <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('DueDateTime ',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
          </li>
        <li className="flex items-center">
          Status
          <Box w="100px" className="ml-2">

          <Select onChange={(e) => rankFilter('Status', e.target.value)}>
  <option value="" disabled selected hidden>☰</option>
  <option value="Not Started">Not Started</option>
  <option value="Deffered">Deffered</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
  <option value="Waiting For Input">Waiting For Input</option>
</Select>
</Box>

        </li>
        <li className="flex items-center">
          Priority
          <Box w="100px" className="ml-2">

          <Select onChange={(e) => rankFilter('Priority', e.target.value)}>
  <option value="" disabled selected hidden>☰</option>
  <option value="Low">Low</option>
  <option value="Mid">Mid</option>
  <option value="High">High</option>
  <option value="Highest">Highest</option>
</Select>
</Box>

</li>
        <li className="flex items-center">
          Related To
          <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('Account',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>

        </li>
        <li className="flex items-center">
          Manager
          <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('Manager',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
          </li>
      </ul>
      </div>
      <div className="record-list-wrapper">
      <ul className="record-list" id="task-longer">

          {Tasks.length === 0 ? <p className="noRecord flex justify-center p-4 text-gray-500">No Tasks Found.</p> 
          : 
          <>
        {Tasks.map(Task => (
          <div className="recordlist-record">
          <li key={Task.TaskID} id="task-longer" className={`flex gap-3 task record ${checkedRecords.includes(Task.TaskID) ? 'selected' : ''}`} onClick={()=>navTo(Task)} >
              <p id="firstRecord">
                <input type="checkbox" className="checkItem" 
                checked={selectAll || checkedRecords.includes(Task.TaskID)}
                onClick={(event) => {
                  // Stops the onClick function in the parent LI from happening
                  event.stopPropagation();
                  handleCheckboxClick(Task.TaskID, event);
                }}>
                </input>
              {Task.Subject}</p>
            <p>{new Date(Task.DueDateTime)
                    .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
                    .replace(/\//g, '-')}

              {isDueTomorrow(Task.DueDateTime) && (
                  <span className="due-tomorrow-message"> (DUE TOMMOROW)</span>
                )}

                {isDueToday(Task.DueDateTime) && (
                  <span className="due-today-message"> (DUE TODAY)</span>
                )}

                {isPastDue(Task.DueDateTime) && (
                  <span className="past-due-message"> (PAST DUE)</span>
                )}
                {/* If new date tmr =, due tmr, or today, or past due ? */}
                
                </p>
            <p id={Task.Status === 'In Progress' ? 'Inprogress' : Task.Status === 'Completed' ? 'Completed' : Task.Status === 'Deffered' ? 'Deffered' : Task.Status === 'Not Started' ? 'NotStarted' : Task.Status === 'Waiting For Input' ? 'Waiting-for-input' : "" }>{Task.Status}</p>
            <p id={Task.Priority === 'Low' ? 'Low' : Task.Priority === 'Mid' ? 'Mid' : Task.Priority === 'High' ? 'High' : Task.Priority === 'Highest' ? 'Highest' :  "" }>{Task.Priority}</p>
            <p>{Task.Account}</p>
            <p>{Task.Manager}</p>
          </li>
          </div>

        ))}
        </>}
      </ul>
      </div>
      </div>
      </div>
    </>
  );
}