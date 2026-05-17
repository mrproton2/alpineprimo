import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

import API from "../services/api";

export default function Login() {

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      const response = await API.post(
        "/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      setError("");

      window.location.href =
        "/dashboard/upload";

    } catch (err) {

      console.log(err);

      setError(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-page">

      <Paper className="login-paper">

        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>

        {
          error && (

            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>

          )
        }

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>

    </div>
  );
}