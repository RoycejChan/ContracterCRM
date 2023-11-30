import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import Home from '../../home';
import "./webnav.css"


import { Select } from '@chakra-ui/react';

import CreateContact from '../../createNew/newContact/createContact';
import CreateTask from '../../createNew/createNewTask/createTask';
import Contacts from '../../pages/Contacts/contacts';


export default function Webnav() {
  const navigate = useNavigate();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/Tasks", label: "Tasks" },
        { to: "/Contacts", label: "Contacts" },
        { to: "/Accounts", label: "Accounts" },
        { to: "/Services", label: "Services" },
        { to: "/Deals", label: "Deals" },
      ];

  return (
        <>
        <div className="webNav flex justify-between p-4 ">

                <h1 className='text-xl'>CRM☁️</h1>
            <ul className="webNav-links flex gap-6">
            {navLinks.map(({ to, label }) => (
              <li className="webNav-link" key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
            <div className="webNav-profile flex gap-6">
            <Select placeholder='+' size='sm' color='black' bg="cyan" borderColor="cyan" className='' 
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  navigate(`/${selectedOption}`);
                }}
                >
                <option value='createContact'>Contact</option>
                <option value='Leads'>Lead</option>
            </Select>                 <p>Calender</p>
                <div className="profile-img">
                    <img src="#" alt="" />
                </div>
            </div>
        </div>

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/Contacts" element={<Contacts/> } />

        <Route index path="/Tasks" element={<CreateTask />} />
        <Route index path="/createContact" element={<CreateContact />} />
      </Routes>
      </>
  );
}