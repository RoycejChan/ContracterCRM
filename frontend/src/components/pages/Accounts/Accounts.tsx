import { useEffect, useState} from "react";
import "./accounts.css"
const backendURL = 'http://localhost:3000'; 


interface Account {
  AccountID: number;
  AccountName: string;
  AccountSite: string;
  Email: string;
  FrontDeskPhone: number;
}

export default function Accounts() {
  const [accounts, setaccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Account/accounts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        console.log(data);
        setaccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="accounts">
      <h1>account List</h1>
      <ul className="account-list-headers">
        <li>Account Name</li>
        <li>Website</li>
        <li>Email</li>
        <li>Phone</li>
      </ul>
      <ul className="account-list">
        {accounts[0] && accounts[0].map(account => (
          <li key={account.AccountID} className="flex gap-3 account">
            <p>{account.AccountName}</p>
            <p>{account.AccountSite}</p>
            <p>{account.EMAIL}</p>
            <p>{account.FrontDeskPhone}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
