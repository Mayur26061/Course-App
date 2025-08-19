import { Button, TextField, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/atoms/user";
import { signUpAction } from "./fetch";
import { Loading } from "../common/Loading";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const handleSign = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  useEffect(() => {
    if (user.user) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading || user.isLoading) {
    return <Loading />;
  }
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
          <Button variant="contained" size="small" onClick={handleSign} disabled={isLoading}>
            Signup
          </Button>
          <div className="mt-3">
            Already a user?{" "}
            <Button onClick={() => navigate("/signin")} size="small" disabled={isLoading}>
              Signin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
