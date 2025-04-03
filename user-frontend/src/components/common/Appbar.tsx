import { Button, Typography } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";
import { logOutAction } from "./fetch";
import Searchbar from "./Searchbar";

const Appbar = () => {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userOnlyState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  const onLogOut = async () => {
    await logOutAction();
    setUser({
      isLoading: false,
      user: null,
    });
    navigate("/signin");
  };
  return (
    <div className="flex justify-between items-center p-2 bg-slate-50 sticky top-0 z-10 gap-2">
      <div className="flex items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Typography variant="h6">SmartLearn</Typography>
        </div>
      </div>
      <Searchbar />
      {!isLoading && (
        <>
          <div className="flex flex-grow justify-end gap-2">
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
              <Button size="small" variant="contained" onClick={onLogOut}>
                Logout
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Appbar;
