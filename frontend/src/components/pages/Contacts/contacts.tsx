import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react'
import "./contacts.css"
const backendURL = 'http://localhost:3000'; 
import PageNav from "../../navigation/PageNav/PageNav";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Contact/Contacts?limit=${recordsPerPage}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
        const [data] = await response.json();
        console.log(data);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
  }, [recordsPerPage]);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

const createNew = () => {
  navigate('/createContact');
  // !! CANCEL BUTTON GOES BACK 'navigate(-1)'?
    // !! CANCEL BUTTON GOES BACK 'navigate(-1)'?

      // !! CANCEL BUTTON GOES BACK 'navigate(-1)'?

        // !! CANCEL BUTTON GOES BACK 'navigate(-1)'?

}
const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

const handleCheckboxClick = (event: any) => {
  const checkboxes = document.querySelectorAll('.checkItem');
  const atLeastOneChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  setIsCheckboxChecked(atLeastOneChecked);

  const checkbox = event.target;
  const listItem = checkbox.closest('.contact');

  if (checkbox.checked) {
    listItem.style.backgroundColor = '#f1f7ff';
  } else {
    listItem.style.backgroundColor = '';
  }
};

const handleRecordsPerPageChange = (value: string) => {
  setRecordsPerPage(value);
  console.log(recordsPerPage)
};

  return (
    <div className="background">


      <div className="pageNavTop">

    {/* !!MODAL CHAKRA UI FOR ADD TASK */}
      {isCheckboxChecked 
      ? 
      <>
        <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons">
              Send Email
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons">
              Create Task
            </Button>
            <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons">
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


    <PageNav amount={contacts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange}/>


      <div className="contacts">
       { isSidebarOpen ?
        <div className="sidebar"> <h1>BRUH</h1></div> : <></> }

      <div className="mainContent">
      <ul className="contact-list-headers">
        <li id="first-header">Contact Name</li>
        <li>Account Name</li>
        <li>Email ✉️</li>
        <li>Phone</li>
      </ul>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.ContactID} className="flex gap-3 contact">
            <p>
              <input type="checkbox" className="checkItem" onClick={handleCheckboxClick}></input>
              {contact.FirstName} {contact.LastName}</p>
            <p>{contact.AccountName}</p>
            <p>{contact.Email} </p>
            <p>{contact.WorkPhone} 📞</p>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
}
