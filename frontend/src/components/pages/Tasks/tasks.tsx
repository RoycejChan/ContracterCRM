import { useEffect, useState} from "react";
const backendURL = 'http://localhost:3000'; 
import './tasks.css'

interface Task {
  TaskID: number;
  FirstName: string;
  LastName: string;
  AccountName: string;
  Email: string;
  WorkPhone: number; 
}

export default function Tasks() {
  const [Tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/Task/Tasks`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const [tasks] = await response.json();
          setTasks(tasks);
      } catch (error) {
        console.error('Error fetching Tasks:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <div className="tasks">
      <h1>Task List</h1>
      <ul className="task-list-headers">
        <li>Subject</li>
        <li>Due Date</li>
        <li>
          <p>Status</p>
        </li>
        <li>Priority</li>
        <li>Related To</li>
        <li>Manager</li>
      </ul>
      <ul className="task-list">
        {Tasks.map(Task => (
          <li key={Task.TaskID} className="flex gap-3 task">
            <p>{Task.Subject}</p>
            <p>{Task.DueDateTime}</p>
            <p>{Task.Status}</p>
            <p>{Task.Priority}</p>
            <p>{Task.Account}</p>
            <p>{Task.Manager}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
