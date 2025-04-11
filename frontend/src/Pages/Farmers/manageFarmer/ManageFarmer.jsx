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
import { DangerButtons, PrimaryButtons, PrimaryButtonsOutline } from "@/components/ui/Buttons";
import { AlertWithResponse, SuccessAlert, ErrorAlert } from "@/utils/Alerts";
import { Capitalize, selectedTableData } from "@/utils/utilityFunction";
import { IoIosPeople } from "react-icons/io";
import { FaUserCheck, FaUsersSlash , FaMale ,FaFemale } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { CiExport } from "react-icons/ci";
//TEST DATA
// import {tableHeadings, tableContents } from "@/utils/testData";

function ManageFarmer() {
  //Modals
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isEditFarmerModalOpen, setIsEditFarmerModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [tableContent, setTableContent] = useState([]);
  const [totalFarmers, setTotalFarmers] = useState(0)
  const [totalActiveFarmers, setTotalActiveFarmers] = useState(0)
  const [totalMale, setTotalMale] = useState(0)
  const [totalFemale, setTotalFemale] = useState(0)
  const [totalInactiveFarmers, setTotalInactiveFarmers] = useState(0)

  // const tableHeadings = ["ID", "Email", "First Name", "Last Name", "Avatar"];

  const tableHeadings = [
    "Farmer ID", "First Name", "Last Name", "Age", "Surname", "Gender", 
    "Contact Details", "Education Level", "Residential Address", "Date Created", 
    "Farm Location", "Farm Association Membership", "Farming Experience", "Farm GPS Coordinates", 
    "Farming Practice", "Crop Type", "Harvest Dates","Land Size", "Market Prices", 
    "Mechanization", "Revenue", "Soil Type", "Yield Per Acre"
  ];
//To handel a farmer Edit
  const handleEditClick = (farmer) => {
    setSelectedFarmer(farmer)
    setIsEditFarmerModalOpen(true);
  };

  const handleDelete = (farmers) => {
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
    // Function to fetch farmer data
    const fetchData = async () => {
      try {
        const {success , farmers} = await FarmerService.getAllFarmers();
        if (success && farmers) {
          const formattedData = farmers.map((farmer) => [
            farmer.farmer_Id,
            Capitalize(farmer.first_name),
            Capitalize(farmer.last_name),
            farmer.age,
            Capitalize(farmer.surname),
            farmer.gender,
            farmer.contact_details,
            Capitalize(farmer.education_level),
            farmer.residential_address,
            farmer.date_created,
            farmer.farm_location,
            farmer.farm_association_memb,
            farmer.farming_experience,
            farmer.farm_gps_coordinates,
            farmer.farming_practice,
            farmer.crop_type,
            farmer.harvest_dates,
            farmer.land_size,
            farmer.market_prices,
            farmer.mechanization,
            farmer.revenue,
            farmer.soil_type,
            farmer.yield_per_acre,
          ]);
          setTableContent(formattedData);
          //Total farmers
          setTotalFarmers(farmers.length)
          //Total active farmers
          const activeFarmers = farmers.filter(farmer => farmer.is_active == true)
          setTotalActiveFarmers(activeFarmers.length)
          //Total male farmers
          const maleFarmers = farmers.filter(farmer => farmer.gender == "male")
          setTotalMale(maleFarmers.length)
          //Total female farmers
          const femaleFarmers = farmers.filter(farmer => farmer.gender == "female")
          setTotalFemale(femaleFarmers.length)
          //Total deleted farmers
          const inactiveFarmers = farmers.filter(farmer => farmer.is_active == false)
          setTotalInactiveFarmers(inactiveFarmers.length)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Fetch data when component mounts
    useEffect(() => {
      fetchData();
    }, []);

    //handle checked farmer export
    const handelCheckedFarmers = () => {
      const message = "Please select at least one farmer to export.";
      const checkedFarmersData = selectedTableData("manage_farmer")
      checkedFarmersData.length > 1 ? exportFarmers(checkedFarmersData) : ErrorAlert("Error", message)  
    };

    const exportFarmers = (checkedFarmersData) => {
      // Convert to CSV string
      const csvString = checkedFarmersData.map(row => row.join(",")).join("\n");
      // Encode as URI
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvString);
      // Create and trigger download link
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "farmers.csv");
      document.body.appendChild(link); // Append for Firefox compatibility
      link.click();
      document.body.removeChild(link); // Clean up
    }

  return (
    <main className="h-fit min-h-[100vh] bg-white rounded-2xl flex flex-col gap-4 shadow-lg p-4">
      {/* Header */}
      <div>
        <h1 className="text-base md:text-2xl font-semibold flex items-center gap-2">Farmers<GiFarmer className="mr-2 h-7 w-7 border-[2px] border-black p-1 rounded-full" /></h1>
        <header className="flex items-center justify-between mb-4">
        <h1 className="text-base md:text-xl">Manage your farmers</h1>
          <ModalComponent header="Add Farmer" openModal = {isAddFarmerModalOpen} onClose= {()=>setIsAddFarmerModalOpen(false)}>
            <AddFarmer setIsAddFarmerModalOpen={setIsAddFarmerModalOpen} fetchData = {fetchData} />
          </ModalComponent>
          <div className="flex gap-2 md:gap-4 items-center">
            <PrimaryButtonsOutline onClick= {handelCheckedFarmers} text="Export" btnIcon={<CiExport className="mr-2 h-5 w-5" />} />
            <PrimaryButtons onClick= {()=> setIsAddFarmerModalOpen(true)} text="Add farmer" btnIcon={<FiPlus className="mr-2 h-5 w-5" />} />
          </div>
        </header>
      </div>

      {/* Summary Cards */}
      <article className="grid grid-cols-2 md:grid-cols-5 text-gray-700 gap-6">
        <Card  title="Total Farmers" className="w-full h-32">
          <div className="flex gap-3 items-center">
            <IoIosPeople className="mr-2 h-10 w-10" />
            <span className="text-xl font-medium">Total Farmers</span>
          </div>
          <p className="text-4xl font-bold">{totalFarmers}</p>
        </Card>
        <Card  title="Total Farmers" className="w-full h-32">
          <div className="flex gap-3 items-center">
            <FaMale className="mr-2 h-10 w-10" />
            <span className="text-xl font-medium">Total Male</span>
          </div>
          <p className="text-4xl font-bold">{totalMale}</p>
        </Card>
        <Card  title="Total Farmers" className="w-full h-32">
          <div className="flex gap-3 items-center">
            <FaFemale className="mr-2 h-10 w-10" />
            <span className="text-xl font-medium">Total Female</span>
          </div>
          <p className="text-4xl font-bold">{totalFemale}</p>
        </Card>
        <Card  title="Total Farmers" className="w-full h-32">
          <div className="flex gap-3 items-center">
            <FaUserCheck className="mr-2 h-10 w-10" />
            <span className="text-xl font-medium">Active Farmers</span>
          </div>
          <p className="text-4xl font-bold">{totalActiveFarmers}</p>
        </Card>
        <Card  title="Total Farmers" className="w-full h-32">
          <div className="flex gap-3 items-center">
            <FaUsersSlash  className="mr-2 h-10 w-10" />
            <span className="text-xl font-medium">Inactive Farmers</span>
          </div>
          <p className="text-4xl font-bold">{totalInactiveFarmers}</p>
        </Card>
      </article>

      {/* Table Section */}
      <Card>
        <TableComponent
        table_id = "manage_farmer" 
        tableHeadings={tableHeadings} 
        tableContent={tableContent}
        deleteButton = {<DangerButtons onClick= {handleDelete} text="Delete" btnIcon={<MdDeleteForever className="mr-2 h-5 w-5" />}/>}
        onDeleteClick = {handleDelete}
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
