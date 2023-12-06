
export const clearSelectedFunction = () => {
    const checkboxes = document.querySelectorAll('.checkItem');
  
    checkboxes.forEach((checkbox) => {
      const listItem = checkbox.closest('.record');

      if (listItem) {
        listItem.style.backgroundColor = '';
      }
  

      checkbox.checked = false;
    });
  };
  