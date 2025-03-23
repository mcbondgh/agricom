"use client";
import PropTypes from "prop-types";
import { Table, Checkbox } from "flowbite-react";

//DYNAMIC TABLE THAT ACCEPT WTO ARRAYS, ONE FOR HEADER AND THE FOR CONTENT
export function TableComponent({ tableHeadings = [], tableContent = [] }) {
    return (
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
          <Table.HeadCell>NO</Table.HeadCell>
            {tableHeadings.length > 0 ? (
              tableHeadings.map((heading, index) => (
                <Table.HeadCell key={index}>{heading}</Table.HeadCell>
              ))
            ) : (
              <Table.HeadCell>No Data</Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {tableContent.length > 0 ? (
              tableContent.map((row, rowIndex) => (
                <Table.Row key={rowIndex} className="bg-white">
                  <Table.Cell>
                  <Checkbox color="success"/>
                  </Table.Cell>
                  {row.map((cell, cellIndex) => (
                    <Table.Cell key={cellIndex} className={cellIndex === 0 ? "whitespace-nowrap font-medium text-gray-900" : ""}>
                      {cell}
                    </Table.Cell>
                  ))}
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
    );
  }

//SETTING THE PROPERTIES DATA TYPES
TableComponent.propTypes = {
  tableHeadings: PropTypes.arrayOf(PropTypes.string),
  tableContent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node, 
  ]))),
};