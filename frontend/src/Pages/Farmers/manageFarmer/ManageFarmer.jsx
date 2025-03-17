import { ModalComponent } from "../../../components/ui/Modal"
import AddFarmer from "../manageFarmer/addFarmer/AddFarmer"
import { FiPlus } from "react-icons/fi";
import  { TableComponent }  from "../../../components/ui/Table";
import { Card } from "flowbite-react";

function ManageFarmer() {

const tableHeadings = [
  "First Name", "Last Name", "Email", "Age", "Work Experience", 
  "Contact", "Country", "Status", "Gender", "Actions"
];

const tableContent = [
  ["John", "Doe", "john.doe@example.com", 28, "5 years", "123-456-7890", "USA", "Active", "Male", <a href="#">Edit</a>],
  ["Jane", "Smith", "jane.smith@example.com", 32, "8 years", "987-654-3210", "Canada", "Inactive", "Female", <a href="#">Edit</a>],
  ["Michael", "Brown", "michael.brown@example.com", 40, "15 years", "456-789-0123", "UK", "Active", "Male", <a href="#">Edit</a>],
  ["Emily", "Johnson", "emily.johnson@example.com", 25, "3 years", "321-654-9870", "Australia", "Active", "Female", <a href="#">Edit</a>],
  ["Daniel", "Williams", "daniel.williams@example.com", 35, "10 years", "654-321-0987", "Germany", "Inactive", "Male", <a href="#">Edit</a>]
];

  return (
    <main className="h-[200vh] bg-white rounded-2xl flex flex-col gap-4 shadow-lg p-4">
    {/* Header */}
     <header className="flex items-center justify-between">
     <h1 className="text-2xl font-semibold mb-4">Manage Farmer</h1>
      <ModalComponent btnType={1}  btnIcon={<FiPlus className="mr-2 h-5 w-5"/>} text="Add Farmer" header = "Add Farmer" >
        <AddFarmer/>
      </ModalComponent>
     </header>

    {/* Table side */}
    <Card>
    <TableComponent tableHeadings={tableHeadings} tableContent={tableContent} />
    </Card>
    </main>
  )
}

export default ManageFarmer