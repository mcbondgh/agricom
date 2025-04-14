import { ModalComponent } from "@/components/ui/Modal";
import AddFarmer from "../manageFarmer/addFarmer/AddFarmer";
import { FiPlus } from "react-icons/fi";
import { TableComponent } from "@/components/ui/Table";
import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import FarmerService from "@/services/farmerService";
import { EditFarmer } from "./editFarmer/EditFarmer";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { DangerButtons, PrimaryButtons } from "@/components/ui/Buttons";
import { AlertWithResponse, SuccessAlert } from "@/utils/Alerts";

function ManageFarmer() {
  //Modals
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isEditFarmerModalOpen, setIsEditFarmerModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [tableContent, setTableContent] = useState([]);
    // Function to handle row edit and pass the selected data

  // const tableHeadings = ["ID", "Email", "First Name", "Last Name", "Avatar"];

  // State for fetched table content and filtered content
  
  //just for test
  const tableHeadings = [
    "ID", "Surname", "Last Name", "Gender", "Age", "Contact",
    "Educational Level", "Farm GPS Coordinate", "Experience",
    "Residential Address", "Login ID", "Created", "Association"
  ];
  const tableContents = [
    ["F001", "Mensah", "Kwame", "Male", 45, "0541234567", "Secondary", "5.6037, -0.1870", 15, "Accra, Ghana", "kwame_mensah", "2024-03-15", "Yes"],
    ["F002", "Adu", "Ama", "Female", 38, "0249876543", "Tertiary", "6.6732, -1.5693", 10, "Kumasi, Ghana", "ama_adu", "2023-12-10", "No"],
    ["F003", "Owusu", "Kojo", "Male", 52, "0203344556", "Primary", "7.0924, -2.3945", 25, "Sunyani, Ghana", "kojo_owusu", "2022-07-21", "Yes"],
    ["F004", "Boateng", "Yaw", "Male", 30, "0556789123", "Secondary", "5.8764, -0.2030", 8, "Cape Coast, Ghana", "yaw_boateng", "2024-01-05", "No"],
    ["F005", "Opoku", "Mavis", "Female", 27, "0598765432", "Tertiary", "6.2345, -1.4523", 5, "Tamale, Ghana", "mavis_opoku", "2023-09-18", "Yes"],
    ["F006", "Asante", "Joseph", "Male", 60, "0234567890", "None", "7.8765, -2.3456", 40, "Koforidua, Ghana", "joseph_asante", "2021-05-10", "Yes"],
    ["F007", "Gyasi", "Akua", "Female", 35, "0265432189", "Secondary", "6.9876, -0.7654", 12, "Takoradi, Ghana", "akua_gyasi", "2022-11-25", "No"],
    ["F008", "Kusi", "Daniel", "Male", 48, "0243210987", "Tertiary", "5.4321, -1.6789", 20, "Ho, Ghana", "daniel_kusi", "2023-06-14", "Yes"],
    ["F009", "Nkrumah", "Efua", "Female", 41, "0298765412", "Primary", "7.6543, -0.8765", 18, "Bolgatanga, Ghana", "efua_nkrumah", "2024-02-28", "Yes"],
    ["F010", "Dapaah", "Frank", "Male", 55, "0212345678", "None", "6.5432, -1.2345", 30, "Wa, Ghana", "frank_dapaah", "2022-08-09", "No"]
  ];
  

  const handleEditClick = (farmer) => {
    setSelectedFarmer(farmer)
    setIsEditFarmerModalOpen(true);
  };

  const handelDelete = (farmers) => {
    // let farmer_id = farmers[0]
    const farmer_name = farmers[1] + " " + farmers[2]
    const deleteMessage =  `Are sure you want to delete ${farmer_name}`;
    AlertWithResponse(
      "Delete Farmer",
      deleteMessage,
      ()=> {
        //TODO api to delete farmer and return response
        const successMessage = `${farmer_name} has been deleted successfully`;
        SuccessAlert(successMessage);
      }
    )
  }

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FarmerService.getOnlineDataTest();
        if (response && response.data) {
          const formattedData = response.data.map((user) => [
            user.id,
            user.email,
            user.first_name,
            user.last_name,
            <img key={user.id} src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />,
          ]);

          setTableContent(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  return (
    <main className="h-fit min-h-[100vh] bg-white rounded-2xl flex flex-col gap-4 shadow-lg p-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-base md:text-2xl font-semibold mb-4">Manage Farmer</h1>
        <ModalComponent header="Add Farmer" openModal = {isAddFarmerModalOpen} onClose= {()=>setIsAddFarmerModalOpen(false)}>
          <AddFarmer />
        </ModalComponent>
        <PrimaryButtons onClick= {()=> setIsAddFarmerModalOpen(true)} text="Add farmer" btnIcon={<FiPlus className="mr-2 h-5 w-5" />} />
      </header>

      {/* Summary Cards */}
      <article className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="w-full h-32" />
        <Card className="w-full h-32" />
        <Card className="w-full h-32" />
        <Card className="w-full h-32" />
      </article>

      {/* Table Section */}
      <Card>
        <TableComponent 
        tableHeadings={tableHeadings} 
        tableContent={tableContents}
        deleteButton = {<DangerButtons onClick= {handelDelete} text="Delete" btnIcon={<MdDeleteForever className="mr-2 h-5 w-5" />}/>}
        onDeleteClick = {handelDelete}
        editButton = {<PrimaryButtons onClick= {handleEditClick} text="Edit" btnIcon={<FaUserEdit className="mr-2 h-5 w-5" />} />}
        onEditClick={handleEditClick}
        />
      </Card>
      <ModalComponent header="Edit Farmer" openModal = {isEditFarmerModalOpen} onClose ={()=> setIsEditFarmerModalOpen(false)}>
        <EditFarmer selectedFarmer={selectedFarmer} />
      </ModalComponent>
    </main>
  );
}

export default ManageFarmer;
