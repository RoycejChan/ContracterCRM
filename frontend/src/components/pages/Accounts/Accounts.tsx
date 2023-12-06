import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import { Button, Stack } from "@chakra-ui/react";
import PageNav from "../../navigation/PageNav/PageNav";
const backendURL = 'http://localhost:3000'; 

interface Account {
  AccountID: number;
  AccountName: string;
  AccountSite: string;
  Email: string;
  FrontDeskPhone: number;
}

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Account/accounts?limit=${recordsPerPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const [data] = await response.json();
        console.log(data);
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, [recordsPerPage]);

  const createNew = () => {
    navigate('/createContact');
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState<any[]>([]);

  const handleCheckboxClick = (record: any, event: any) => {
    const checkboxes = document.querySelectorAll('.checkItem');
    const atLeastOneChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    setIsCheckboxChecked(atLeastOneChecked);
    console.log(record);
    const checkbox = event.target;
    const listItem = checkbox.closest('.contact');
    console.log(checkedRecords);
    if (checkbox.checked) {
      listItem.style.backgroundColor = '#f1f7ff';
      setCheckedRecords((prev) => [...prev, record]);
    } else {
      listItem.style.backgroundColor = '';
      setCheckedRecords((prev) => prev.filter((item) => item !== record));
    }
  };

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(value);
    console.log(recordsPerPage);
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

  const navTo = (contact: any) => {
    console.log(contact);
    navigate('/clickedContact', {
      state: { contact },
    });
  };

  return (
    <>
      <div className="pageNavTop">
        {/* !!MODAL CHAKRA UI FOR ADD TASK */}
        {isCheckboxChecked ? (
          <>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="gray" variant="solid" size="lg" className="filterButtons">
                Send Email
              </Button>
              <Button colorScheme="gray" variant="solid" size="lg" className="filterButtons">
                Create Task
              </Button>
              <Button colorScheme="gray" variant="solid" size="lg" className="filterButtons" onClick={() => deleteRecord()}>
                Delete
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Button onClick={() => toggleSidebar()} size="lg" variant="outline" className="filterToggle">
              FILTER
            </Button>
            <Button colorScheme="twitter" size="lg" onClick={createNew}>
              Create Contact
            </Button>
          </>
        )}
      </div>

      <PageNav amount={accounts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected} />

      <div className="contacts">
        {isSidebarOpen ? <div className="sidebar"> <h1>BRUH</h1></div> : <></>}

        <div className="mainContent">
          <ul className="account-list-headers">
            <li>Account Name</li>
            <li>Website</li>
            <li>Email</li>
            <li>Phone</li>
          </ul>
          <ul className="account-list">
            {accounts.map((account) => (
              <li key={account.AccountID} className="flex gap-3 account record">
                <p>
                  <input type="checkbox" className="checkItem" onClick={(event) => {
                    event.stopPropagation();
                    handleCheckboxClick(account.AccountID, event);
                  }}></input>{account.AccountName}
                </p>
                <p>{account.AccountSite}</p>
                <p>{account.EMAIL}</p> {/***EMAIL? */}
                <p>{account.FrontDeskPhone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
