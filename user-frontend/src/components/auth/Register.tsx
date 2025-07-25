import { Button, TextField, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../stores/atoms/user";
import { signUpAction } from "./fetch";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();
  const handleSign = async () => {
    const response = await signUpAction({ username: email, password, name });
    if (response.user) {
      setUser({ isLoading: false, user: response.user });
      navigate("/courses");
    } else {
      console.log(response.message);
      setUser({
        isLoading: false,
        user: null,
      });
    }
    setEmail("");
    setPassword("");
    setName("");
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
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            <Button onClick={() => navigate("/signin")} size="small">
              Signin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
