// src/components/Records.jsx

import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import RecordCard from "./RecordCard";

export default function Records({
  documents,
  fetchDocuments
}) {

  const [page, setPage] = useState(1);

  const recordsPerPage = 25;

  // sort latest first

  const sortedDocuments =
    [...documents].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

  // pagination

  const totalPages =
    Math.ceil(
      sortedDocuments.length /
      recordsPerPage
    );

  const startIndex =
    (page - 1) * recordsPerPage;

  const currentDocuments =
    sortedDocuments.slice(
      startIndex,
      startIndex + recordsPerPage
    );

  return (
    <div>

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