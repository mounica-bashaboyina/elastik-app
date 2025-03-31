import React, { useContext, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { AuthContext } from "../AuthContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { Header: "Email", accessor: "email" },
  { Header: "First Name", accessor: "firstName" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "DOB", accessor: "dob" },
  { Header: "School Name", accessor: "schoolName" },
  { Header: "School Coordinator", accessor: "coordinator" },
  { Header: "School Teacher", accessor: "teacher" },
];

const URL =
  "https://44kaila63nhyxf267maw6iacuq.appsync-api.ap-southeast-2.amazonaws.com/graphql";

const StudentTable = ({ isMiniTable = false }) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [prevTokens, setPrevTokens] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(isMiniTable ? 5 : 10);

  useEffect(() => {
    fetchData(null);
  }, []);

  const fetchData = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        {
          query: `query ListStudentDevs($limit: Int, $nextToken: String) {
            listStudentDevs(limit: $limit, nextToken: $nextToken) {
              items {
                id
                email
                firstName
                lastName
                dob
                schoolName
                coordinator
                teacher
              }
              nextToken
            }
          }`,
          variables: {
            limit: pageSize,
            nextToken: token,
          },
        },
        {
          headers: { Authorization: authToken },
        }
      );

      const { items, nextToken: newToken } = response.data.data.listStudentDevs;
      setStudents(items);
      setNextToken(newToken);

      if (token && !prevTokens.includes(token)) {
        setPrevTokens((prev) => [...prev, token]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (nextToken) {
      setPage((prev) => prev + 1);
      fetchData(nextToken);
    }
  };

  const handlePrevious = () => {
    if (prevTokens.length > 0) {
      const prevToken = prevTokens[prevTokens.length - 2] || null;
      setPrevTokens((prev) => prev.slice(0, -1));
      setPage((prev) => Math.max(prev - 1, 1));
      fetchData(prevToken);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: students,
      },
      useSortBy
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student List</h1>
      <TableContainer component={Paper}>
        <Table {...getTableProps()} border="1">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {loading ? (
            <p>...Loading</p>
          ) : (
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
          {isMiniTable && (
            <TableFooter onClick={() => navigate("/students")}>
              View More
            </TableFooter>
          )}
        </Table>

        {!isMiniTable && (
          <div>
            <button onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            <span> Page {page} </span>
            <button onClick={handleNext} disabled={!nextToken}>
              Next
            </button>
          </div>
        )}
      </TableContainer>
    </div>
  );
};

export default StudentTable;
