// PageNav.tsx

import { Select } from "@chakra-ui/react";
import "./pageNav.css"

interface PageNavProps {
  amount: any;
  isCheckboxChecked: boolean; 
  onRecordsPerPageChange: (value: string) => void;


}

export default function PageNav({ amount, isCheckboxChecked, onRecordsPerPageChange}: PageNavProps) {
  



  return (
    <>




      <div className="pageNavBottom flex justify-between">
        {isCheckboxChecked 
        ? 
        <p>Selected 1 Records</p> 
        : 
        <p>Total Records <span>{amount}</span></p>
        }
        <div className="rightSidePageNav flex">
          {isCheckboxChecked ?
            <></>
          :          
          <Select variant="solid" onChange={(e) => onRecordsPerPageChange(e.target.value)}>
          <option value="10">10 Records Per Page</option>
          <option value="20">20 Records Per Page</option>
          <option value="30">30 Records Per Page</option>
          <option value="40">40 Records Per Page</option>
          <option value="50">50 Records Per Page</option>
          </Select>}
          <h1>•</h1>
          <h1 className="">1:10</h1>
        </div>
      </div>
    </>
  );
}
