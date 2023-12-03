// PageNav.tsx

import { Select } from "@chakra-ui/react";
import "./pageNav.css"

interface PageNavProps {
  amount: any;
  isCheckboxChecked: boolean; 
  onRecordsPerPageChange: (value: string) => void;
  recordAmountSelected: number;
  clearSelection:()=> void;
}

export default function PageNav({ amount, isCheckboxChecked, onRecordsPerPageChange, recordAmountSelected, clearSelection}: PageNavProps) {
  



  return (
    <>




      <div className="pageNavBottom flex justify-between">
        {isCheckboxChecked 
        ?
        <div className="recordAmountSelected"> 
        <p className="text-2xl">Selected <span className="amount">{recordAmountSelected}</span> Records</p>
        <button onClick={clearSelection} className="clearBtn text-lg">Clear</button> 
        </div>
        : 
        <h1 className="text-2xl">Total Records: <span className="amount">{amount}</span></h1>
        }
        <div className="rightSidePageNav flex">
          {isCheckboxChecked ?
            <></>
          :          
          <Select variant="solid" onChange={(e) => onRecordsPerPageChange(e.target.value)} size='lg'>
          <option value="10">10 Records Per Page</option>
          <option value="20">20 Records Per Page</option>
          <option value="30">30 Records Per Page</option>
          <option value="40">40 Records Per Page</option>
          <option value="50">50 Records Per Page</option>
          </Select>}
          <h1> • </h1>
          <h1 className="flex text-xl"> 1 <span>-</span> 10</h1>
        </div>
      </div>
    </>
  );
}
