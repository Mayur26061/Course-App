import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";
import { BASE_URL } from "../../config";
import { userState } from "../../stores/atoms/user";
import { useRecoilState } from "recoil";
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await axios.post(
      `${BASE_URL}/signin`,
      {
        username: email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.error) {
      console.log(response.data.message);
      return;
    }
    setUser({
      isLoading: false,
      user: response.data.user,
    });
    navigate("/courses");
  };
  useEffect(() => {
    if (user) {
      navigate("/courses");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h6">Sign in</Typography>
      <br />
      <Card className="p-6 w-72" variant="outlined">
        <TextField
          fullWidth={true}
          className="!mb-2.5"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          type="password"
          fullWidth={true}
          className="!mb-2.5"
          label="Password"
          variant="outlined"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="mt-3 flex flex-col items-center justify-center">
          <Button variant="contained" size="small" onClick={handleLogin}>
            Signin
          </Button>
          <div className="mt-3">
            New user?{" "}
            <Button onClick={() => navigate("/admin/signup")} size="small">
              Sign up
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
