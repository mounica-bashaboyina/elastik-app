import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";

const columns = [
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "DOB",
    accessor: "dob",
  },
  {
    Header: "School Name",
    accessor: "schoolName",
  },
  {
    Header: "School Coordinator",
    accessor: "schoolCoordinator",
  },
  {
    Header: "School Teacher",
    accessor: "schoolTeacher",
  },
];

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // To store the total count of students
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(20); // Page size
  
  useEffect(() => {
    fetchData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const fetchData = async (page, size) => {
    setLoading(true);
    const response = await axios.post(
      "https://44kaila63nhyxf267maw6iacuq.appsync-api.ap-southeast-2.amazonaws.com/graphql",
      {
        query: `query ListStudentDevs($limit: Int, $nextToken: String) {
          listStudentDevs(limit: $limit, nextToken: $nextToken) {
            items {
              firstName
              lastName
              dob
              schoolName
              coordinator
              teacher
            }
          }
        }`,
        variables: {
          limit: size,
        },
      },
      {
        headers: {
          "x-api-key": "da2-3cj6ioxoundf5f35kccqmr2s4a", // API key for authentication
        },
      }
    );

    const { items, totalCount } = response.data.data.listStudentDevs;
    setStudents(items);
    setTotalCount(totalCount); // Set the total count
    setLoading(false);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: students,
      initialState: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    useSortBy,
    usePagination
  );

  const pageCount = Math.ceil(totalCount / pageSize); // Total pages

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table {...getTableProps()} border="1">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
              Previous
            </button>
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={pageIndex === pageCount - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTable;
