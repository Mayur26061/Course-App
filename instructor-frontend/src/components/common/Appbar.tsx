import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { logOutCall } from "./fetch";

const Appbar = () => {
  // useRecoilState
  const setUser = useSetRecoilState(userState);
  const userCurrent = useRecoilValue(userState);
  const navigate = useNavigate();

  // move this logic to somewhere else
  const logout = async ()=>{
    await logOutCall()
    setUser({
      isLoading:false,
      user:null
    })
    navigate('/')
  }
  return (
    <div className="flex justify-between p-2 bg-slate-50 sticky top-0 z-20">
      <div>
        <Typography variant="h6">SmartLearn</Typography>
      </div>
      {!userCurrent.isLoading && (
        <div>
          {!userCurrent.user && (
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
          {userCurrent.user && (
            <div className="flex items-center">
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
