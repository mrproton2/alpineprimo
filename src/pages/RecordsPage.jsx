// src/pages/RecordsPage.jsx

import { useEffect, useState } from "react";

import API from "../services/api";

import RecordCard from "../components/RecordCard";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function RecordsPage() {

  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const recordsPerPage = 25;

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments = async () => {

    try {

      const response =
        await API.get("/document/all");

      // latest first

      const sortedDocuments =
        response.data.sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );

      setDocuments(sortedDocuments);

    } catch (error) {

      console.log(error);
    }
  };

  // search filter

  const filteredDocuments =
    documents.filter((doc) => {

      const searchText =
        search.toLowerCase();

      return (

        doc.name
          ?.toLowerCase()
          .includes(searchText)

        ||

        doc.description
          ?.toLowerCase()
          .includes(searchText)

        ||

        doc.cpFirmName
          ?.toLowerCase()
          .includes(searchText)

        ||

        doc.date
          ?.toLowerCase()
          .includes(searchText)

        ||

        doc.decidedDate
          ?.toLowerCase()
          .includes(searchText)

      );
    });

  // pagination

  const totalPages =
    Math.ceil(
      filteredDocuments.length /
      recordsPerPage
    );

  const startIndex =
    (page - 1) * recordsPerPage;

  const currentDocuments =
    filteredDocuments.slice(
      startIndex,
      startIndex + recordsPerPage
    );

  return (
    <div>

      {/* search bar */}

      <Box mb={4}>

        <TextField
          fullWidth
          label="Search by name, date, company..."
          variant="outlined"
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setPage(1);
          }}
        />

      </Box>

      {/* cards */}

      <div className="card-grid">

        {
          currentDocuments.map((doc) => (

            <RecordCard
              key={doc.id}
              doc={doc}
              fetchDocuments={fetchDocuments}
            />

          ))
        }

      </div>

      {/* pagination */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >

        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) =>
            setPage(value)
          }
          color="primary"
        />

      </Box>

    </div>
  );
}