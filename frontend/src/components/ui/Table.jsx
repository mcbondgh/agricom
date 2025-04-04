import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Table, Checkbox, TableCell, TableHeadCell } from "flowbite-react";
import { ColumnFilterDropdown } from "./ColumnFilterDropdown";
import SearchBar from "@/components/ui/SearchBar"; // Import your SearchBar component
import { DangerButtonsMd } from "@/components/ui/Buttons";
import { MdDeleteSweep } from "react-icons/md";

// DYNAMIC TABLE THAT ACCEPTS TWO ARRAYS: ONE FOR HEADERS AND ONE FOR CONTENT
export function TableComponent({
  tableHeadings = [],
  tableContent = [],
  deleteButton,
  editButton,
  onEditClick,
  onDeleteClick
}) {
  // Variables for checkboxes  
  const [checkedRows, setCheckedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  // Initialize visible columns to true for all
  const [visibleColumns, setVisibleColumns] = useState(() => tableHeadings.map(() => true));
  // Variable to hold table content Data to be searched
  const [filteredTableContent, setFilteredTableContent] = useState(tableContent);
  
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

  // Toggle column visibility
  const toggleColumnVisibility = (index) => {
    const updatedVisibility = [...visibleColumns];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleColumns(updatedVisibility);
  };
  
  // Toggle visibility of all columns (Select All)
  const toggleAllColumnsVisibility = () => {
      const newVisibility = visibleColumns.every(Boolean)
        ? new Array(tableHeadings.length).fill(false) // Uncheck all
        : new Array(tableHeadings.length).fill(true); // Check all
      setVisibleColumns(newVisibility);
  };

  // Ensure checkedRows is always in sync with tableContent
  useEffect(() => {
    setCheckedRows(new Array(tableContent.length).fill(false));
    setFilteredTableContent(tableContent); // Keep the filtered content updated
  }, [tableContent]);

 // Checking selected row count
  useEffect(() => {
    const selectedCount = checkedRows.filter(Boolean).length;
    setSelectedRowsCount(selectedCount)
  }, [checkedRows]);
  // Handle individual row checkbox change
  const handleRowCheck = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);

  // If all rows are checked, check the header checkbox
    const allChecked = updatedCheckedRows.every(Boolean);
    setCheckAll(allChecked);
  };

  // Handle header checkbox (check/uncheck all)
  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckedRows(new Array(tableContent.length).fill(isChecked));
  };

  return (
    <main>
       <div className="flex md:justify-between flex-col md:flex-row gap-4 my-4">
        <div className="flex gap-4">
          {/* Dropdown for column filter */}
          <ColumnFilterDropdown
            tableHeadings={tableHeadings}
            visibleColumns={visibleColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            toggleAllColumnsVisibility={toggleAllColumnsVisibility}
          />
          {(selectedRowsCount > 1) && <DangerButtonsMd text="Delete All" btnIcon={<MdDeleteSweep className="mr-2 h-5 w-5" />}/>}
        </div>  
        <SearchBar onSearch={handleSearch} placeholder="Search by name, email, etc." />
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            {/* Heading checkbox for selecting all rows */}
            <Table.HeadCell className="text-center bg-green-600 text-white">
              <Checkbox checked={checkAll} onChange={handleCheckAllChange} color="success" />
            </Table.HeadCell>
            {tableHeadings.length > 0 ? (
              tableHeadings.map((heading, index) =>
                visibleColumns[index] ? (
                  <Table.HeadCell className="text-center bg-green-600 text-white" key={index}>
                    {heading}
                  </Table.HeadCell>
                ) : null
              )
            ) : (
              <Table.HeadCell>No Data</Table.HeadCell>
            )}
            <TableHeadCell className="text-center bg-green-600 text-white">Action</TableHeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredTableContent.length > 0 ? (
              filteredTableContent.map((row, rowIndex) => (
                <Table.Row key={rowIndex} className="bg-white text-base">
                  <Table.Cell>
                    <Checkbox
                      checked={checkedRows[rowIndex] || false} // Ensure a boolean value
                      onChange={() => handleRowCheck(rowIndex)}
                      color="success"
                    />
                  </Table.Cell>
                  {row.map((cell, cellIndex) =>
                    visibleColumns[cellIndex] ? (
                      <Table.Cell
                        key={cellIndex}
                        className={cellIndex === 0 ? "whitespace-nowrap font-medium text-gray-900 text-base" : ""}
                      >
                        {cell}
                      </Table.Cell>
                    ) : null
                  )}
                  <TableCell>
                    <div className="flex gap-2">
                      {React.cloneElement(deleteButton, { onClick: () => onDeleteClick(row) })}
                      {React.cloneElement(editButton, { onClick: () => onEditClick(row) })}
                    </div>
                  </TableCell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={tableHeadings.length || 1} className="text-center py-4">
                  No records available
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}

// SETTING THE PROPERTIES DATA TYPES
TableComponent.propTypes = {
  tableHeadings: PropTypes.arrayOf(PropTypes.string),
  tableContent: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
    )
  ),
  deleteButton: PropTypes.node,
  editButton: PropTypes.node,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};