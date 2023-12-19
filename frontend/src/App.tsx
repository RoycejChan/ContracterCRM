

// import { BrowserRouter as Router, Route, Routes, Link}  from 'react-router-dom';
import "./index.css"
import BottomNav from './components/navigation/bottomNav/bottomNav'
import Webnav from './components/navigation/webnav/webnav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contacts from "./components/pages/Contacts/contacts";
import Accounts from "./components/pages/Accounts/Accounts";
import Tasks from "./components/pages/Tasks/tasks";
import Contact from "./components/pages/Contacts/clickedContact";
import Account from "./components/pages/Accounts/clickedAccount";
import Task from "./components/pages/Tasks/clickedTask";
import CreateAccount from "./components/createNew/newAccount/createAccount";
import CreateTask from "./components/createNew/createNewTask/createTask";
import CreateContact from "./components/createNew/newContact/createContact";
function App() {

  return (
    <Router>

      <Webnav/>
      <BottomNav/>

      
      <Routes>
        <Route index path="/" element={<Contacts/> } />
        <Route index path="/Accounts" element={<Accounts/> } />
        <Route index path="/Tasks" element={<Tasks />} />
        <Route index path="/createContact" element={<CreateContact />} />
        <Route index path="/clickedContact" element={<Contact />} />
        <Route index path="/clickedAccount" element={<Account />} />
        <Route index path="/clickedTask" element={<Task />} />
        <Route index path="/createAccount" element={<CreateAccount/> } />
        <Route index path="/createTask" element={<CreateTask/> } />

      </Routes>
    </Router>
  )
}

export default App
