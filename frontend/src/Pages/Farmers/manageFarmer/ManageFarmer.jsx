import { ModalComponent } from "../../../components/ui/Modal";
import AddFarmer from "../manageFarmer/addFarmer/AddFarmer";
import { FiPlus } from "react-icons/fi";
import { TableComponent } from "../../../components/ui/Table";
import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import SearchBar from "../../../components/ui/SearchBar";
import FarmerService from "../../../services/farmerService";

function ManageFarmer() {
  const tableHeadings = ["ID", "Email", "First Name", "Last Name", "Avatar"];

  // State for fetched table content and filtered content
  const [tableContent, setTableContent] = useState([]);
  const [filteredTableContent, setFilteredTableContent] = useState([]);

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
          setFilteredTableContent(formattedData); // Update both
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  // Handle Search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredTableContent(tableContent);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredContent = tableContent.filter((row) =>
      row.some(
        (cell) => typeof cell === "string" && cell.toString().toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredTableContent(filteredContent);
  };

  return (
    <main className="h-fit min-h-[100vh] bg-white rounded-2xl flex flex-col gap-4 shadow-lg p-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-base md:text-2xl font-semibold mb-4">Manage Farmer</h1>
        <ModalComponent btnType={1} btnIcon={<FiPlus className="mr-2 h-5 w-5" />} text="Add Farmer" header="Add Farmer">
          <AddFarmer />
        </ModalComponent>
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
        <SearchBar onSearch={handleSearch} placeholder="Search by name, email, etc." />
        <TableComponent tableHeadings={tableHeadings} tableContent={filteredTableContent} />
      </Card>
    </main>
  );
}

export default ManageFarmer;