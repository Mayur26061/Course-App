import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, Typography } from "@mui/material";
import { BASE_URL } from "../../config";
import { userOnlyState } from "../../stores/selectors/user";
import { useRecoilValue } from "recoil";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const user = useRecoilValue(userOnlyState)
  const navigate = useNavigate();
  const handleSignUp = async () => {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username: email,
      password,
      name,
    });
    if (response.data.error) {
      console.log(response.data.message);
      return;
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/courses");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h6">Sign Up</Typography>
      <br />
      <Card className="p-6 w-72" variant="outlined">
        <TextField
          className="!mb-2.5"
          fullWidth={true}
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="!mb-2.5"
          fullWidth={true}
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          className="!mb-2.5"
          fullWidth={true}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-3 flex flex-col items-center justify-center">
          <Button variant="contained" size="small" onClick={handleSignUp}>
            Signup
          </Button>
          <div className="mt-3">
            Already a user?{" "}
            <Button onClick={() => navigate("/admin/signin")} size="small">
              Signin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Register;
