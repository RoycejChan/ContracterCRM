import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import Home from '../../pages/Home/home';
import "./webnav.css"


import { Select } from '@chakra-ui/react';

import CreateContact from '../../createNew/newContact/createContact';
import CreateTask from '../../createNew/createNewTask/createTask';
import Contacts from '../../pages/Contacts/contacts';
import Accounts from '../../pages/Accounts/Accounts';
import CreateAccount from '../../createNew/newAccount/createAccount';
import Tasks from '../../pages/Tasks/tasks';
import Contact from '../../pages/Contacts/clickedContact';
import Account from '../../pages/Accounts/clickedAccount';


export default function Webnav() {
  const navigate = useNavigate();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/Tasks", label: "Tasks" },
        { to: "/Contacts", label: "Contacts" },
        { to: "/Accounts", label: "Accounts" },
      ];

  return (
        <>
        <div className="webNav flex justify-between p-4 ">

                <h1 className='text-3xl'>CRM 🧭</h1>
            <ul className="webNav-links flex gap-6">
            {navLinks.map(({ to, label }) => (
              <li className="webNav-link" key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
            <div className="webNav-profile flex gap-6">
            <Select  defaultValue=""

                 size='md' color='black' bg="cyan" borderColor="cyan" 
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  navigate(`/${selectedOption}`);
                }}
                >
                <option value="" disabled selected hidden>➕</option>
                <option value='createContact'>Contact</option>
                <option value='createAccount'>Account</option>
                <option value='createTask'>Task</option>
            </Select>                
                <div className="profile-img">
                    <img src="#" alt="" />
                </div>
            </div>
        </div>

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/Contacts" element={<Contacts/> } />
        <Route index path="/Accounts" element={<Accounts/> } />
        <Route index path="/Tasks" element={<Tasks />} />


        <Route index path="/createContact" element={<CreateContact />} />
        <Route index path="/clickedContact" element={<Contact />} />
        <Route index path="/clickedAccount" element={<Account />} />

        <Route index path="/createAccount" element={<CreateAccount/> } />
        <Route index path="/createTask" element={<CreateTask/> } />

      </Routes>
      </>
  );
}