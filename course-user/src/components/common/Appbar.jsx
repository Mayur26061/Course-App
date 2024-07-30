import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";
import axios from "axios";
import { BASE_URL } from "../config";
const Appbar = () => {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  const onLogOut = async ()=>{
    const response = await axios.post(
      `${BASE_URL}/api/learner/login`,{},
{
  withCredentials:true
}
);
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/signin");
  }
  return (
    <div className="flex justify-between p-2 bg-slate-50 sticky top-0 z-10">
      <div onClick={() => navigate("/")}>
        <Typography variant="h6">SmartLearn</Typography>
      </div>
      {!isLoading && (
        <>
          <div>
            <div className="flex items-center gap-2">
              <a
                className="py-1 px-1.5 text-blue-700 border border-blue-700"
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
                  onClick={onLogOut}
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
