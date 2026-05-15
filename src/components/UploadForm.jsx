// src/components/UploadForm.jsx

import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import API from "../services/api";

export default function UploadForm() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    cpFirmName: "",
    date: "",
    decidedDate: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("cpFirmName", form.cpFirmName);
      formData.append("date", form.date);
      formData.append("decidedDate", form.decidedDate);
      formData.append("image", image);

      await API.post("/document/upload", formData);

      alert("Uploaded Successfully");

      setForm({
        name: "",
        description: "",
        cpFirmName: "",
        date: "",
        decidedDate: "",
      });

      setImage(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <Paper className="upload-paper">

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Upload Document
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="CP Firm Name"
          name="cpFirmName"
          value={form.cpFirmName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="decidedDate"
          value={form.decidedDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box sx={{ mt: 3 }}>

          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: "bold",
            }}
          >
            Upload Image
          </Typography>

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Choose Image

            <input
              hidden
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          {
            image && (
              <Typography sx={{ mt: 1 }}>

                Selected File: {image.name}

              </Typography>
            )
          }

        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 4,
            height: "50px",
            fontWeight: "bold",
          }}
        >
          Upload Document
        </Button>

      </form>

    </Paper>
  );
}