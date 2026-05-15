import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import API from "../services/api";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {

    await API.post("/auth/register", form);

    alert("Registered");
  };

  const handleLogin = async () => {

    const response = await API.post("/auth/login", {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.name);

    window.location.href = "/dashboard/upload";
  };

  return (
    <div className="login-page">

      <Paper className="login-paper">

        <Typography variant="h4">

          {isLogin ? "Login" : "Register"}

        </Typography>

        {!isLogin && (
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            onChange={handleChange}
          />
        )}

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
          sx={{ mt: 2 }}
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Login" : "Register"}
        </Button>

        <Typography
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Create Account"
            : "Already have account?"}
        </Typography>

      </Paper>

    </div>
  );
}