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

//TEST DATA
import {tableHeadings, tableContents } from "../../../utils/testData";

function ManageFarmer() {
  //Modals
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isEditFarmerModalOpen, setIsEditFarmerModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [tableContent, setTableContent] = useState([]);

  // const tableHeadings = ["ID", "Email", "First Name", "Last Name", "Avatar"];



  

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
  }, []); 

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
