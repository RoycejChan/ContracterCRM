// PageNav.tsx

import { Select } from "@chakra-ui/react";
import "./pageNav.css"

interface PageNavProps {
  amount: any;
  toggleFilter: () => void; 
}

export default function PageNav({ amount, toggleFilter }: PageNavProps) {
  return (
    <>
      <div className="pageNavTop">
        <button onClick={toggleFilter}>🎲</button>
      </div>

      <div className="pageNavBottom flex justify-between">
        <p>Total Records {amount}</p>
        <div className="rightSidePageNav flex">
          <Select>
            <option value="10">10 Records Per Page</option>
          </Select>
          <h1>.</h1>
          <h1 className="font-bold">1:10</h1>
        </div>
      </div>
    </>
  );
}
