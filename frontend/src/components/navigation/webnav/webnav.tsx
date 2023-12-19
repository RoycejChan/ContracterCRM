import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';

import './webnav.css';

export default function Webnav() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();

  const navLinks = [
    { to: "/Tasks", label: "Tasks" },
    { to: "/", label: "Contacts" },
    { to: "/Accounts", label: "Accounts" },
  ];

  useEffect(() => {
    setSelectedOption('');
  }, [location.pathname]);

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
          <Select
            value={selectedOption}
            size='md' color='black' bg="cyan" borderColor="cyan"
            onChange={(e) => {
              const selectedOption = e.target.value;
              setSelectedOption(selectedOption);
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
    </>
  );
}
