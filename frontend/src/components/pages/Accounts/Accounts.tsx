import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import { Button, Stack } from "@chakra-ui/react";
import PageNav from "../../navigation/PageNav/PageNav";
const backendURL = 'http://localhost:3000'; 

import { deleteRecordFunction } from "../deleteRecord.js"
import { clearSelectedFunction } from "../clearSelection.js";
import { handleCheckboxClickFunction } from "../handleCheckboxClick.js"

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
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState<any[]>([]);


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
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, [recordsPerPage]);

//button to toggle filter sidebar
const toggleSidebar = () => {setIsSidebarOpen((prev) => !prev);};

//button to create new record
const createNew = () => {navigate('/createAccount')};

//Handles UI change when a record is clicked
const handleCheckboxClick = (record:any, event:any) => {
    const checkbox = event.target;
    const listItem = checkbox.closest('.record');
    handleCheckboxClickFunction(record, checkbox, listItem, setIsCheckboxChecked, setCheckedRecords);
};

//CHANGES THE AMOUNT OF RECORDS DISPLAYED
const handleRecordsPerPageChange = (value: string) => {setRecordsPerPage(value)};

//DELETE SELECTED RECORD(s)
const deleteRecord = async () => {
  await deleteRecordFunction('Account', 'deleteAccount', checkedRecords)
  .then(window.location.reload())
  .catch((error:any) => console.error('Error deleting record:', error));
};

//CLEAR CHECK SELECTED RECORD(s)
const clearSelected = () => {
    clearSelectedFunction(); 
    setIsCheckboxChecked(false);
    setCheckedRecords([]);
  };

//navigates to clicked record
const navTo = (account: any) => {
    navigate('/clickedAccount', {state: { account }});
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
              Create Account
            </Button>
          </>
        )}
      </div>

      <PageNav amount={accounts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} recordAmountSelected={checkedRecords.length} clearSelection={clearSelected} />

      <div className="contacts records">
        {isSidebarOpen ? <div className="sidebar"> <h1>Filter</h1></div> : <></>}

        <div className="mainContent">
          <ul className="record-headers">
            <li id="first-header">Account Name</li>
            <li>Website</li>
            <li>Email</li>
            <li>Phone</li>
          </ul>
          <ul className="record-list">
            {accounts.map((account) => (
              <li key={account.AccountID} className="flex gap-3 account record" onClick={()=>navTo(account)}>
                <p>
                  <input type="checkbox" className="checkItem" onClick={(event) => {
                    event.stopPropagation();
                    handleCheckboxClick(account.AccountID, event);
                  }}></input>{account.AccountName}
                </p>
                <p>{account.AccountSite}</p>
                <p>{account.Email}</p> {/***EMAIL? */}
                <p>{account.FrontDeskPhone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
