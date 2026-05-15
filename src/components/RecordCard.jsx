// src/components/RecordCard.jsx

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import API from "../services/api";

export default function RecordCard({
  doc,
  fetchDocuments
}) {

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure want to delete?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(
        `/document/delete/${doc.id}`
      );

      alert("Record Deleted Successfully");

      // refresh data
      fetchDocuments();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <Card className="record-card">

      {
        doc.imageName && (
          <img
            src={`http://54.237.162.64:8080/images/${doc.imageName}`}
            alt="document"
            className="record-image"
          />
        )
      }

      <CardContent>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {doc.name}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          {doc.description}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>CP Firm:</strong>
          {" "}
          {doc.cpFirmName}
        </Typography>

        <Typography sx={{ mb: 3 }}>
          <strong>Date:</strong>
          {" "}
          {doc.date}
        </Typography>

        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete Record
        </Button>

      </CardContent>

    </Card>
  );
}