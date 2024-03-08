import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Appbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/me", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserEmail(res.data.user);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {!isloading && (
        <div>
          {!userEmail && (
            <div>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
              <Button size="small" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          )}
          {userEmail && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 5 }}>{userEmail}</div>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/login";
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appbar;
