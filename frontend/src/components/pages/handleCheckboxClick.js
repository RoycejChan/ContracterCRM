
export const handleCheckboxClickFunction = (record, checkbox, listItem, setIsCheckboxChecked, setCheckedRecords) => {
    const checkboxes = document.querySelectorAll('.checkItem');
    const atLeastOneChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    setIsCheckboxChecked(atLeastOneChecked);
  
    if (checkbox.checked) {
      listItem.style.backgroundColor = '#f1f7ff';
      setCheckedRecords((prev) => [...prev, record]);
    } else {
      listItem.style.backgroundColor = '';
      setCheckedRecords((prev) => prev.filter((item) => item !== record));
    }
  };
  