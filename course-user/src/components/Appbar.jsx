import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        position: "sticky",
        top: "0",
        background: "#eeeeee",
        zIndex: 100,
      }}
    >
      <div onClick={() => navigate("/")}>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {!isLoading && (
        <>
          <div>
            <div>
              <a
                style={{
                  margin: 20,
                  padding: "4px 10px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  color: "#1976d2",
                  border: "solid 1px #1976d2",
                }}
                href="http://localhost:8000/"
                target="_blank"
              >
                Be an Instrutor
              </a>
              {!userEmail && (
                <>
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
                </>
              )}
            {userEmail && (
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
            )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Appbar;
