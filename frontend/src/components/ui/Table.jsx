import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Table, Checkbox, Button } from "flowbite-react";
import { LuPin, LuPinOff } from "react-icons/lu";
import { ColumnFilterDropdown } from "@/components/ui/ColumnFilterDropdown";
import SearchBar from "@/components/ui/SearchBar";
import { DangerButtonsMd } from "@/components/ui/Buttons";
import { MdDeleteSweep } from "react-icons/md";
import AuthService from "@/services/authService";

export function TableComponent({
  table_id,
  tableHeadings = [],
  tableContent = [],
  deleteButton,
  editButton,
  onEditClick,
  onDeleteClick,
}) {
  const [checkedRows, setCheckedRows] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(() =>tableHeadings.map(() => true));
  const [filteredTableContent, setFilteredTableContent] = useState(tableContent);
  const [currentPage, setCurrentPage] = useState(1);
  const [stickyRow, setStickyRow] = useState(() => {
    const stored = localStorage.getItem("stickyHeader");
    return stored === "true";
  });
  const [columnWidths, setColumnWidths] = useState(() => {
    const saved = localStorage.getItem("columnWidths");
    return saved ? JSON.parse(saved) : tableHeadings.map(() => 150);
  });
  const rowsPerPage = 10;
  const tableRef = useRef(null);
  const resizeRef = useRef({ index: null, startX: 0 });

  useEffect(() => {
    localStorage.setItem("columnWidths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    setCheckedRows(new Array(tableContent.length).fill(false));
    setFilteredTableContent(tableContent);
  }, [tableContent]);

  useEffect(() => {
    const count = Object.values(checkedRows).filter(Boolean).length;
    setSelectedRowsCount(count);
  }, [checkedRows]);

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

  const toggleColumnVisibility = (index) => {
    const updated = [...visibleColumns];
    updated[index] = !updated[index];
    setVisibleColumns(updated);
  };

  const toggleAllColumnsVisibility = () => {
    const newState = visibleColumns.every(Boolean)
      ? new Array(tableHeadings.length).fill(false)
      : new Array(tableHeadings.length).fill(true);
    setVisibleColumns(newState);
  };

  const handleRowCheck = (rowKey) => {
    setCheckedRows((prev) => ({...prev,[rowKey]: !prev[rowKey],}));
  };

  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const newChecked = { ...checkedRows };
    paginatedContent.forEach((row) => {
    newChecked[row[0]] = isChecked;
  });

  setCheckedRows(newChecked);
  };

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

  const handleDeleteAll = async () => {
    const result = await AuthService.fetchUser();
    console.log(result);
  };

  const totalPages = Math.ceil(filteredTableContent.length / rowsPerPage);

  const paginatedContent = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTableContent.slice(start, start + rowsPerPage);
  }, [filteredTableContent, currentPage]);

  const visibleColumnIndexes = visibleColumns
    .map((visible, index) => (visible ? index : null))
    .filter((i) => i !== null);

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
              onClick={handleDeleteAll}
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
        <Table hoverable striped id={table_id}>
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
                  className="relative bg-green-600 text-white font-semibold text-center whitespace-nowrap overflow-hidden overflow-ellipsis border-r-[1px] border-gray-50"
                  style={{
                    width: columnWidths[index],
                    maxWidth: columnWidths[index],
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span title={heading} className="w-full overflow-hidden text-ellipsis">
                      {heading}
                    </span>
                    <div
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-10 hover:bg-green-400 transition-all"
                      onMouseDown={(e) => handleColumnResizeStart(e, index)}
                      onDoubleClick={() => {
                        setColumnWidths((prev) => {
                          const updated = [...prev];
                          updated[index] = 150;
                          return updated;
                        });
                      }}
                    />
                  </div>
                </Table.HeadCell>
              ) : null
            )}
            <Table.HeadCell className={`text-center bg-green-600 text-white ${stickyRow ? 'sticky z-20 right-0 border-l-gray-50 shadow-xl' : ''}`}>
              <span className="flex items-center justify-between">
                Action
                {stickyRow ? (
                  <LuPin
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setStickyRow(false);
                      localStorage.setItem("stickyHeader", "false");
                    }}
                  />
                ) : (
                  <LuPinOff
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setStickyRow(true);
                      localStorage.setItem("stickyHeader", "true");
                    }}
                  />
                )}
              </span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {paginatedContent.length > 0 ? (
              paginatedContent.map((row, index) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + index;
                return (
                  <Table.Row key={actualIndex} className="bg-white text-base">
                    <Table.Cell>
                      <Checkbox
                        className="mb-1"
                        checked={!!checkedRows[row[0]]}
                        onChange={() => handleRowCheck(row[0])}
                        color="success"
                      />
                    </Table.Cell>
                    {visibleColumnIndexes.map((cellIndex) => (
                      <Table.Cell
                        className="text-center overflow-hidden whitespace-nowrap overflow-ellipsis"
                        key={cellIndex}
                        style={{
                          width: columnWidths[cellIndex],
                          maxWidth: columnWidths[cellIndex],
                        }}
                      >
                        {row[cellIndex]}
                      </Table.Cell>
                    ))}
                    <Table.Cell
                      className={`${
                        stickyRow ? "sticky right-0 z-10 bg-white border-l-2 shadow-2xl" : ""
                      }`}
                    >
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}

TableComponent.propTypes = {
  table_id: PropTypes.string,
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
