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
const [checkedRecords, setCheckedRecords] = useState<any[]>([]);


const handleCheckboxClick = (contact:any, event: any) => {
  const checkboxes = document.querySelectorAll('.checkItem');
  const atLeastOneChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  setIsCheckboxChecked(atLeastOneChecked);
  console.log(contact);
  const checkbox = event.target;
  const listItem = checkbox.closest('.contact');
  console.log(checkedRecords)
  if (checkbox.checked) {
    listItem.style.backgroundColor = '#f1f7ff';
    setCheckedRecords((prev) => [...prev, contact]);
 
  } else {
    listItem.style.backgroundColor = '';
    setCheckedRecords((prev) => prev.filter((item) => item !== contact));
  }
};

const handleRecordsPerPageChange = (value: string) => {
  setRecordsPerPage(value);
  console.log(recordsPerPage)
};

const deleteRecord = async () => {
  try {
    const response = await fetch(`${backendURL}/Contact/deleteContact`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordsToDelete: checkedRecords }),
    });

    if (response.ok) {
      console.log('Contacts deleted successfully');
      window.location.reload();
    } else {
      console.error('Error deleting contacts:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting contacts:', error);
  }
};

const clearSelected = () => {
  const checkboxes = document.querySelectorAll('.checkItem');

  checkboxes.forEach((checkbox) => {
    const listItem = checkbox.closest('.contact');
    listItem.style.backgroundColor = '';
    checkbox.checked = false;
  });

  setIsCheckboxChecked(false);
  setCheckedRecords([]);
};

const navTo = (contact:any) => {
  console.log(contact);
  navigate('/clickedContact',
    {
      state:{contact}
    }
    )
}


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


    <PageNav amount={contacts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected}/>


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
          <li key={contact.ContactID} className="flex gap-3 contact record" onClick={()=>navTo(contact)}>
            <p>
              <input type="checkbox" className="checkItem" onClick={(event) => {
            // Stop the event propagation to prevent the li click event
            event.stopPropagation();
            handleCheckboxClick(contact.ContactID, event);
          }}></input>
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
