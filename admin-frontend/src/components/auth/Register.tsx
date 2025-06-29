import { Button, TextField, Card, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "./fetch";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState({ error: false, message: null });
  const navigate = useNavigate();
  const handleSignUp = async () => {
    setMessage({ error: false, message: null });
    const rep = await signUpAction({
      username: email,
      password,
      name,
    });
    setMessage({ error: rep.error, message: rep.message });
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h6">Sign Up</Typography>
      <br />
      <Card className="p-6 w-72" variant="outlined">
        {message.message && (
          <Alert
            severity={message.error ? "error" : "info"}
            className="my-2.5"
            onClose={() => {
              setMessage({ error: false, message: null });
            }}
          >
            {message.message}
          </Alert>
        )}{" "}
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
