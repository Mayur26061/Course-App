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
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {!isLoading && (
        <div>
          {!userEmail && (
            <div>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate("/admin/signup")}
              >
                Sign Up
              </Button>
              <Button size="small" onClick={() => navigate("/admin/signin")}>
                Sign In
              </Button>
            </div>
          )}
          {userEmail && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => navigate("/admin/createcourse")} variant="text">
                Add Course
              </Button>
              <Button onClick={() => navigate("/admin/courses")} variant="text">
                Courses
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                  navigate("/admin/signin");
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
