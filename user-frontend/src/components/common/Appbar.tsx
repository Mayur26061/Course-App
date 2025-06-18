import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";
import { logOutAction } from "./fetch";
import Searchbar from "./Searchbar";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userOnlyState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  const onLogOut = async () => {
    handleClose();
    await logOutAction();
    setUser({
      isLoading: false,
      user: null,
    });
    navigate("/signin");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(userEmail);
    setAnchorEl(event.currentTarget);
  };

  const redirectToMy = () => {
    handleClose();
    navigate("/my");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex justify-between items-center p-2 bg-slate-50 sticky top-0 z-10 gap-2 shadow-md">
      <div className="flex items-center">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer px-2 py-1 text-lg font-semibold"
        >
          SmartLearn
        </div>
      </div>
      <Searchbar />
      {!isLoading && (
        <>
          <div className="flex flex-grow justify-end gap-2">
            {!userEmail && (
              <>
                <button
                  className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </>
            )}
            {userEmail && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {userEmail.image ? (
                    <div>
                      <img
                        src={userEmail.image}
                        className="size-8 rounded-full"
                      />
                    </div>
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={redirectToMy}>
                    <IconButton
                      size="medium"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={onLogOut}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <LogoutIcon />
                    </IconButton>
                    Sign out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Appbar;
