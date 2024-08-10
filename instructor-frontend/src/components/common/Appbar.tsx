import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";
import { BASE_URL } from "../../config";
import axios from "axios";

const Appbar = () => {
  // useRecoilState
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userOnlyState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  const logout = async ()=>{
    await axios.post(`${BASE_URL}/signout`, {},{withCredentials:true})
    setUser({
      isLoading:false,
      user:null
    })
  }
  return (
    <div className="flex justify-between p-2 bg-slate-50 sticky top-0 z-20">
      <div>
        <Typography variant="h6">SmartLearn</Typography>
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
            <div className="flex items-center">
              <Button
                onClick={() => navigate("/createcourse")}
                variant="text"
              >
                Add Course
              </Button>
              <Button onClick={() => navigate("/courses")} variant="text">
                Courses
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={logout}
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
