import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Appbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchme = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/me", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if(res.data.user){
          setUserEmail(res.data.user);
        }
        setIsLoading(false);
      } catch {
        console.log("Error");
      }
    };
    fetchme();
  }, []);
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
              <Button onClick={() => navigate("/createcourse")} variant="text">
                Add Course
              </Button>
              <Button onClick={() => navigate("/courses")} variant="text">
                Courses
              </Button>
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
