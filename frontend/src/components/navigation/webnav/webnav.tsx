import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../../home';
import "./webnav.css"

export default function Webnav() {
  return (
    <Router>
        <>
        <div className="webNav flex justify-between p-4 ">

                <h1 className='text-xl'>CRM☁️</h1>

            <ul className="webNav-links flex gap-6">
                <li className="webNav-link">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="webNav-link">
                    <Link to="/Tasks">
                        Tasks
                    </Link>
                </li>
                <li className="webNav-link">
                    <Link to="/Leads">
                        Leads
                    </Link>
                </li>
                <li className="webNav-link">
                    <Link to="/Contacts">
                        Contacts
                    </Link>
                </li>
                <li className="webNav-link">
                    <Link to="/Accounts">
                        Accounts
                    </Link>
                </li>
                <li className="webNav-link">
                    <Link to="/Services">
                        Services
                    </Link>
                </li>
            </ul>
            <div className="webNav-profile flex gap-6">
                <button className='bg-slate-100 p-1 rounded-md'>➕</button>
                <p>Calender</p>
                <div className="profile-img">
                    <img src="#" alt="profileImg" />
                </div>
            </div>
        </div>

        </>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>

    </Router>
  );
}