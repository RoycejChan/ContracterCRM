import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react'
import "./contacts.css";
const backendURL = 'http://localhost:3000'; 
import PageNav from "../../navigation/PageNav/PageNav";
import { deleteRecordFunction } from "../deleteRecord.js"
import { clearSelectedFunction } from "../clearSelection.js";
import { handleCheckboxClickFunction } from "../handleCheckboxClick.js"
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
interface Contact {
  ContactID: number;
  FirstName: string;
  LastName: string;
  AccountName: string;
  Email: string;
  WorkPhone: number; 
}

export default function Contacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);

  const[column, setColumn] = useState('');
  const[rank, setRank] = useState('');

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Contact/Contacts?limit=${recordsPerPage}&page=${currentPage}&column=${column}&rank=${rank}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const [data] = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchData();
  }, [recordsPerPage, currentPage, rank]);

//button to toggle filter sidebar
const toggleSidebar = () => {setIsSidebarOpen((prev) => !prev);};

//button to create new record
const createNew = () => {navigate('/createContact');}

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
    await deleteRecordFunction('Contact', 'deleteContact', checkedRecords)
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
  setCheckedRecords(selectAll ? [] : contacts.map((contact) => contact.ContactID));
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


  return (

    <>
      <div className="pageNavTop">

    {/* !!MODAL CHAKRA UI FOR ADD TASK */}
      {isCheckboxChecked 
      ? 
      // THIS SHOWS WHEN A RECORD IS CLICKED, THESE ARE THE FUNCTION THAT CAN BE DONE WITH IT
      <>
        <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons">
              Send Email
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons">
              Create Task
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons" onClick={()=>deleteRecord()}>
              Delete
            </Button>
      </Stack>
      </>
      : 
      <>
      <Button onClick={()=>toggleSidebar()} size='lg' variant='outline' className="filterToggle">
          FILTER
        </Button>
        <Button colorScheme='twitter' size='lg' onClick={createNew}>
          Create Contact
        </Button >
      </>
      }
      </div>


    <PageNav amount={contacts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected}
    nextPageClick={nextPage} prevPageClick={prevPage}/>


      <div className="contacts records">
       { isSidebarOpen ? 
       <div className="sidebar"> <h1>FILTER</h1></div> 
       : 
       <></> }

      <div className="mainContent">
        <ul className="record-headers">
          <li id="first-header" className="flex items-center">
          {contacts.length != 0 ? <input
              type="checkbox"
              className="checkItem"
              checked={selectAll}
              onChange={handleSelectAll}
            /> 
            :<></>}
            Contact Name
            <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('LastName',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
            </li>
          <li className="flex items-center">
            Account Name
            <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('AccountName',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
          </li>
          <li className="flex items-center">
            Email ✉️
            <Box w="100px" className="ml-2">
            <Select onChange={(e)=> rankFilter('Email',e.target.value )}>
            <option value="" disabled selected hidden>☰</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </Select> 
            </Box>
          </li>
          <li className="flex items-center">Phone</li>
        </ul>
        <ul className="record-list">
          {contacts.map(contact => (
            <li key={contact.ContactID} className={`flex gap-3 contact record ${checkedRecords.includes(contact.ContactID) ? 'selected' : ''}`} onClick={()=>navTo(contact)}>
              <p>
                <input type="checkbox" className="checkItem" 
                       checked={selectAll || checkedRecords.includes(contact.ContactID)}
                       onClick={(event) => {
                  // Stops the onClick function in the parent LI from happening
                  event.stopPropagation();
                  handleCheckboxClick(contact.ContactID, event);
                }}>
                </input>
              {contact.LastName}, {contact.FirstName}</p>
              <p>{contact.AccountName}</p>
              <p className="email"
                    onClick={(event) => {
                    event.stopPropagation();
                    handleCheckboxClick(contact.ContactID, event);
                  }}
              >{contact.Email} </p>
              <p>{contact.WorkPhone} 📞</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
