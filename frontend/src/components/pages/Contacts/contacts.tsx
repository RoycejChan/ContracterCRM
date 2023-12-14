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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [emailSubject,setEmailSubject] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  
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
  handleCheckboxClickFunction(record, checkbox, listItem, setIsCheckboxChecked, setCheckedRecords, contacts);
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
  console.log(emailMsg);
  console.log(emailSubject);
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
  console.log(emailFile);
}

const [emailFile, setEmailFile] = useState<File | null>(null);


const uploadFile = (files: FileList | null) => {
  if (files && files.length > 0) {
    setEmailFile(files[0]);
  } else {
    setEmailFile(null);
  }
};

const sendEmailFunction = () => {
  
  sendEmail(checkedRecords, (record:any) => contacts.find((c) => c.ContactID === record), backendURL, emailSubject, emailMsg, emailFile, onClose);
}



  




  return (

    <>
      <div className="pageNavTop">
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered size="xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Contact Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody className="flex flex-col gap-4">

        <h1>From: <span className="email"> CRMCompanyEmail.com</span></h1>

        <h1>To:</h1>
        <div className="flex overflow-scroll overflow-y-hidden pb-2">
          {checkedRecords.map((record) => {
            const contact = contacts.find((c) => c.ContactID === record);
            return (

              <span key={record} className="mr-2">
                {contact && (
                  <p className="bg-gray-200 rounded-md inline-block px-2 whitespace-nowrap">
                    {contact.LastName}, {contact.FirstName}
                  </p>
                )}
              </span>
            );
          })}
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

    {/* !!MODAL CHAKRA UI FOR ADD TASK */}
      {isCheckboxChecked 
      ? 
      // THIS SHOWS WHEN A RECORD IS CLICKED, THESE ARE THE FUNCTION THAT CAN BE DONE WITH IT
      <>
        <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons" onClick={onOpen}>
              Send Email
            </Button>
            <Button colorScheme='gray' isDisabled variant='solid' size='lg' className="filterButtons">
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
        {contacts.length === 0 ? <p className="noRecord flex justify-center p-4 text-gray-500">No Contacts Found.</p> 
          : 
          <>
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
          ))}</>}
        </ul>
      </div>
      </div>
    </>
  );
}
