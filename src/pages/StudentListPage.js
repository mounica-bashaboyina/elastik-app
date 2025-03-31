import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";

import { AuthContext } from "../AuthContext";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const API_URL =
  "https://44kaila63nhyxf267maw6iacuq.appsync-api.ap-southeast-2.amazonaws.com/graphql";

const columns = [
  { Header: "Email", accessor: "email" },
  { Header: "First Name", accessor: "firstName" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "DOB", accessor: "dob" },
  { Header: "School Name", accessor: "schoolName" },
  { Header: "School Coordinator", accessor: "coordinator" },
  { Header: "School Teacher", accessor: "teacher" },
];

const gqlQuery = `query ListStudentDevs($limit: Int, $nextToken: String) {
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
          }`;

const StudentListPage = ({ isMiniTable = false }) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [prevTokens, setPrevTokens] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(isMiniTable ? 5 : 8);

  useEffect(() => {
    fetchData(null);
  }, []);

  const fetchData = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        {
          query: gqlQuery,
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
    <div style={{ padding: isMiniTable ? "2px" : "20px" }}>
      <Box display="flex" justifyContent="space-between">
        <h2>
          {!isMiniTable && <ArrowBackIcon onClick={() => navigate("/")} />}{" "}
          Student List
        </h2>
        {isMiniTable ? (
          <Link style={{ color: "#1922E4" }} href="/students">
            View More
          </Link>
        ) : (
          <Pagination
            nextToken={nextToken}
            page={page}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        )}
      </Box>
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
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {loading ? (
            <Loading columnLength={columns.length} />
          ) : (
            <TableBody style={{ height: 500 }} {...getTableBodyProps()}>
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
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentListPage;
