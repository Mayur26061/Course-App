import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleSign = async () => {
    const response = await axios.post("http://localhost:3000/admin/signup", {
      username: email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/courses");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Register to the website</Typography>
      <br />
      <Card style={{ width: "275px", padding: "20px" }} variant="outlined">
        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth={true}
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth={true}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          size="small"
          onClick={handleSign}
        >
          Register
        </Button>
        <div style={{ marginTop: "10px" }}>
          Already a user?{" "}
          <Button onClick={() => navigate("/Login")} size="small">
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Register;
