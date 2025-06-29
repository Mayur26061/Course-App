import { Button, TextField, Card, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import React from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../stores/atoms/user";
import { loginAction } from "./fetch";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleLogin = async () => {
    const response = await loginAction(email, password);
    if (response.error) {
      console.log(response.message);
    } else {
      if (response.user) {
        setUser({
          isLoading: false,
          user: response.user,
        });
        if (searchParams.get("courseId")) {
          navigate(`/course/${searchParams.get("courseId")}`);
        } else {
          navigate("/courses");
        }
      }
    }
    setEmail("");
    setPassword("");
  };

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
            <Button onClick={() => navigate("/signup")} size="small">
              Sign up
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
