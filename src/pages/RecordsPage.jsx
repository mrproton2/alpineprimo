// src/pages/RecordsPage.jsx

import { useEffect, useState } from "react";

import API from "../services/api";

import RecordCard from "../components/RecordCard";

export default function RecordsPage() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments = async () => {
    try {

      const response =
        await API.get("/document/all");

      setDocuments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="card-grid">

      {
        documents.map((doc) => (

          <RecordCard
            key={doc.id}
            doc={doc}
            fetchDocuments={fetchDocuments}
          />

        ))
      }

    </div>
  );
}