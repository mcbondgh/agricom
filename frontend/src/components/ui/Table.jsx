import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { Table, Checkbox, Button } from "flowbite-react";
import { ColumnFilterDropdown } from "./ColumnFilterDropdown";
import SearchBar from "@/components/ui/SearchBar";
import { DangerButtonsMd } from "@/components/ui/Buttons";
import { MdDeleteSweep } from "react-icons/md";

export function TableComponent({
  tableHeadings = [],
  tableContent = [],
  deleteButton,
  editButton,
  onEditClick,
  onDeleteClick,
}) {
  const [checkedRows, setCheckedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    tableHeadings.map(() => true)
  );
  const [filteredTableContent, setFilteredTableContent] = useState(tableContent);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Resizable columns
  const [columnWidths, setColumnWidths] = useState(
    tableHeadings.map(() => 150)
  );
  const tableRef = useRef(null);
  const resizeRef = useRef({ index: null, startX: 0 });

  //Function for search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredTableContent(tableContent);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = tableContent.filter((row) =>
      row.some(
        (cell) =>
          typeof cell === "string" && cell.toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredTableContent(filtered);
    setCurrentPage(1);
  };
 // function for toggling column filter visibility
  const toggleColumnVisibility = (index) => {
    const updated = [...visibleColumns];
    updated[index] = !updated[index];
    setVisibleColumns(updated);
  };
 // function for toggling all column filter visibility
  const toggleAllColumnsVisibility = () => {
    const newState = visibleColumns.every(Boolean)
      ? new Array(tableHeadings.length).fill(false)
      : new Array(tableHeadings.length).fill(true);
    setVisibleColumns(newState);
  };

  useEffect(() => {
    setCheckedRows(new Array(tableContent.length).fill(false));
    setFilteredTableContent(tableContent);
  }, [tableContent]);

  //Use effect to determine the number of selected rows
  useEffect(() => {
    const selectedCount = checkedRows.filter(Boolean).length;
    setSelectedRowsCount(selectedCount);
  }, [checkedRows]);

  const handleRowCheck = (index) => {
    const updated = [...checkedRows];
    updated[index] = !updated[index];
    setCheckedRows(updated);
    setCheckAll(updated.every(Boolean));
  };
  
  // function for handling pagination
  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const updated = [...checkedRows];
    for (let i = start; i < end && i < filteredTableContent.length; i++) {
      updated[i] = isChecked;
    }
    setCheckedRows(updated);
  };
  
  const totalPages = Math.ceil(filteredTableContent.length / rowsPerPage);
  const paginatedContent = filteredTableContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const visibleColumnIndexes = visibleColumns
    .map((visible, index) => (visible ? index : null))
    .filter((i) => i !== null);

  //function to handel column resize  
  const handleColumnResizeStart = (e, index) => {
    resizeRef.current = { index, startX: e.clientX };
    document.addEventListener("mousemove", handleColumnResize);
    document.addEventListener("mouseup", stopColumnResize);
  };

  const handleColumnResize = (e) => {
    const { index, startX } = resizeRef.current;
    const deltaX = e.clientX - startX;

    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = Math.max(60, newWidths[index] + deltaX);
      return newWidths;
    });

    resizeRef.current.startX = e.clientX;
  };

  const stopColumnResize = () => {
    document.removeEventListener("mousemove", handleColumnResize);
    document.removeEventListener("mouseup", stopColumnResize);
  };

  return (
    <main>
      <div className="flex md:justify-between flex-col md:flex-row gap-4 my-4">
        <div className="flex gap-4">
          <ColumnFilterDropdown
            tableHeadings={tableHeadings}
            visibleColumns={visibleColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            toggleAllColumnsVisibility={toggleAllColumnsVisibility}
          />
          {selectedRowsCount > 1 && (
            <DangerButtonsMd
              text="Delete All"
              btnIcon={<MdDeleteSweep className="mr-2 h-5 w-5" />}
            />
          )}
        </div>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name, email, etc."
        />
      </div>

      <div className="overflow-x-auto" ref={tableRef}>
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell className="text-center bg-green-600 text-white border-r-[1px] border-gray-50">
              <Checkbox
                checked={checkAll}
                onChange={handleCheckAllChange}
                color="success"
              />
            </Table.HeadCell>
            {tableHeadings.map((heading, index) =>
              visibleColumns[index] ? (
                <Table.HeadCell
                  key={index}
                  className="relative bg-green-600 text-white font-semibold text-center border-r-[1px] border-gray-50"
                  style={{
                    width: columnWidths[index],
                    maxWidth: columnWidths[index],
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      title={heading}
                      className="w-full overflow-hidden text-ellipsis"
                    >
                      {heading}
                    </span>
                    <div
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-10 hover:bg-green-400 transition-all"
                      onMouseDown={(e) => handleColumnResizeStart(e, index)}
                      style={{ cursor: 'col-resize' }}
                    />
                  </div>
                </Table.HeadCell>
              ) : null
            )}
            <Table.HeadCell className="text-center bg-green-600 text-white">
              Action
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {paginatedContent.length > 0 ? (
              paginatedContent.map((row, index) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + index;
                return (
                  <Table.Row key={actualIndex} className="bg-white text-base">
                    <Table.Cell className="flex items-center justify-center">
                      <Checkbox
                        checked={checkedRows[actualIndex] || false}
                        onChange={() => handleRowCheck(actualIndex)}
                        color="success"
                      />
                    </Table.Cell>
                    {visibleColumnIndexes.map((cellIndex) => (
                      <Table.Cell
                        className="text-center"
                        key={cellIndex}
                        style={{
                          width: columnWidths[cellIndex],
                          maxWidth: columnWidths[cellIndex],
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row[cellIndex]}
                      </Table.Cell>
                    ))}
                    <Table.Cell>
                      <div className="flex gap-2 items-center justify-center">
                        {React.cloneElement(deleteButton, {
                          onClick: () => onDeleteClick(row),
                        })}
                        {React.cloneElement(editButton, {
                          onClick: () => onEditClick(row),
                        })}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={visibleColumnIndexes.length + 2}
                  className="text-center py-4"
                >
                  No records available
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between md:justify-end items-center gap-2 mt-4">
          <Button
            gradientMonochrome="success"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            gradientMonochrome="success"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}

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
  onDeleteClick: PropTypes.func,
};