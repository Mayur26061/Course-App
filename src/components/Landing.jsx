import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  return (
    <div>
      <Typography variant="h3">Welcome to course selling website</Typography>
      <div style={{ padding: 5 }}>
        <Link style={{ margin: 2 }} to={"/register"}>
          <Button variant="contained">
            Register
          </Button>
        </Link>
        <Link style={{ margin: 2 }} to={"/login"}>
          <Button variant="contained">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
