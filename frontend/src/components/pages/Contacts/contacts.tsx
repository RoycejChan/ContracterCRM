import { useEffect, useState} from "react";
import "./contacts.css"
const backendURL = 'http://localhost:3000'; 


interface Contact {
  ContactID: number;
  FirstName: string;
  LastName: string;
  AccountName: string;
  Email: string;
  WorkPhone: number; 
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Contact/Contacts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        console.log(data);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="contacts">
      <h1>Contact List</h1>
      <ul className="contact-list-headers">
        <li>Contact Name</li>
        <li>Account Name</li>
        <li>Email</li>
        <li>Phone</li>
      </ul>
      <ul className="contact-list">
        {contacts[0] && contacts[0].map(contact => (
          <li key={contact.ContactID} className="flex gap-3 contact">
            <p>{contact.FirstName} {contact.LastName}</p>
            <p>{contact.AccountName}</p>
            <p>{contact.Email}</p>
            <p>{contact.WorkPhone}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
