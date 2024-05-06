import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userState } from "../stores/atoms/user";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "../stores/selectors/userEmail";
import { userLoadingState } from "../stores/selectors/isUserLoading";

const Appbar = () => {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <div onClick={()=>navigate('/')}>
          <Typography variant="h6">
            Coursera
            </Typography>
      </div>
      {!isLoading && (
        <div>
          {!userEmail && (
            <div>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button size="small" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
            </div>
          )} 
          {userEmail && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  localStorage.setItem("client-token", null);
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                  navigate("/signin");
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
