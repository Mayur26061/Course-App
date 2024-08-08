import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, Typography } from "@mui/material";
import { BASE_URL } from "../../config";
import { userState } from "../../stores/atoms/user";
import { useSetRecoilState } from "recoil";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();
  const handleSign = async () => {
    const response = await axios.post(`${BASE_URL}/admin/signup`, {
      username: email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setUser({ isLoading: false, userEmail: email });
      navigate("/admin/courses");
    } else {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h6">Sign Up</Typography>
      <br />
      <Card className="p-6 w-72" variant="outlined">
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
          <Button variant="contained" size="small" onClick={handleSign}>
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
