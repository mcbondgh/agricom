export const Capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  export const IsActiveText  = (isActive) => {
    if (isActive) return "Active";
    return "Inactive";
 }
 
 export const isDeletedText = (isDeleted) => {
    if (isDeleted) return "Deleted";
    return "Not Deleted";
 }

 export const selectedTableData = (table_id) => {
   const manage_farmerTable = document.getElementById(`${table_id}`);
   const tableHead = manage_farmerTable.querySelector("thead");
   const tableBody = manage_farmerTable.querySelector("tbody");
   //checked rows
   const checkedRows = tableBody.querySelectorAll("input[type='checkbox']:checked");
   //table Headings
   const tableHeadings = Array.from(tableHead.querySelectorAll("th"))
     .map(th => th.textContent.trim()).slice(1, -1);// Remove first and last columns
   //checked table body
   const selectedTableBody = Array.from(checkedRows).map((row) => {
     const cells = row.parentNode.parentNode.querySelectorAll("td");
     const rowData = Array.from(cells).map(cell => cell.innerText.trim());
     return rowData.slice(1, -1); // Remove first and last columns
   });
   return [tableHeadings, ...selectedTableBody]
 }

 export const allowNumbersOnly = (e) => {
  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
    e.preventDefault();
  }
}

export const allowTextOnly = (e) => {
  if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
}