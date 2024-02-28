import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField,Card,Typography } from "@mui/material";


/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    axios
      .post("http://localhost:3000/admin/signup", {
        username: email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("auth", "Bearer " + response.data.token);
          navigate("/courses");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{textAlign:"center"}}>
        <Typography variant="h6">
      Register to the website
        </Typography>
      <br />
    <Card style={{width: "275px",margin:"auto",padding:"20px"}} variant="outlined">
      <TextField style={{ margin: "10px" }} id="email" label="Email" variant="outlined"  value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <br />
      <TextField style={{ margin: "10px" }} id="password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <Button style={{ margin: "10px" }} variant="contained" size="small">
        Register
      </Button>
      <br />
      Already a user?{" "}
      <Button
        onClick={() => navigate("/Login")}
        size="small"
        >
        Login
      </Button>
          </Card>
    </div>
  );
}

export default Register;
