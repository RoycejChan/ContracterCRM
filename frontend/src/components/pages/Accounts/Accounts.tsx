import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import { Button, Stack } from "@chakra-ui/react";
import PageNav from "../../navigation/PageNav/PageNav";
const backendURL = 'http://localhost:3000'; 

import { deleteRecordFunction } from "../deleteRecord.js"
import { clearSelectedFunction } from "../clearSelection.js";
import { handleCheckboxClickFunction } from "../handleCheckboxClick.js"
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

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
  const [selectAll, setSelectAll] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);

  const[column, setColumn] = useState('');
  const[rank, setRank] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Account/accounts?limit=${recordsPerPage}&page=${currentPage}&column=${column}&rank=${rank}`, {
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
  }, [recordsPerPage, currentPage, rank]);

//button to toggle filter sidebar
const toggleSidebar = () => {setIsSidebarOpen((prev) => !prev);};

//button to create new record
const createNew = () => {navigate('/createAccount')};

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
  await deleteRecordFunction('Account', 'deleteAccount', checkedRecords)
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
const navTo = (account: any) => {
    navigate('/clickedAccount', {state: { account }});
  };

const handleSelectAll = () => {
  setSelectAll((prev) => !prev);
  setIsCheckboxChecked(!selectAll);
  setCheckedRecords(selectAll ? [] : accounts.map((account) => account.AccountID));
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

      <PageNav 
        amount={accounts.length} isCheckboxChecked={isCheckboxChecked} onRecordsPerPageChange={handleRecordsPerPageChange} 
        recordAmountSelected={checkedRecords.length} clearSelection={clearSelected} 
        nextPageClick={nextPage} prevPageClick={prevPage}
        />

      <div className="contacts records">
        {isSidebarOpen ? <div className="sidebar"> <h1>Filter</h1></div> : <></>}

        <div className="mainContent">
          <ul className="record-headers">
            <li id="first-header" className="flex items-center">
            {accounts.length != 0 ? <input
              type="checkbox"
              className="checkItem"
              checked={selectAll}
              onChange={handleSelectAll}
            /> 
            :<></>}
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
              Website</li>
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
            <li className="flex items-center">
            Phone Number
            </li>
          </ul>
          <ul className="record-list">
            {accounts.map((account) => (
              <li key={account.AccountID} className={`flex gap-3 account record ${checkedRecords.includes(account.AccountID) ? 'selected' : ''}`} onClick={()=>navTo(account)}>
                <p>
                  <input type="checkbox" className="checkItem" 
                    checked={selectAll || checkedRecords.includes(account.AccountID)}
                    onClick={(event) => {
                    event.stopPropagation();
                    handleCheckboxClick(account.AccountID, event);
                  }}></input>{account.AccountName}
                </p>
                <p
                  onClick={(event) => {event.stopPropagation();}}>
                  <a href={`${account.AccountSite}`} target="_blank"
                  className="website">
                  {account.AccountSite}
                  </a>
                  </p>
                <p className="email"
                    onClick={(event) => {event.stopPropagation();}}>
                {account.Email}</p> {/***EMAIL? */}
                <p>📞{account.FrontDeskPhone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
