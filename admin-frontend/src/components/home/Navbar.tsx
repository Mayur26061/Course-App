import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useRecoilState, useRecoilValue } from "recoil";
import { navState } from "../../store/atoms/sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { userState } from "../../store/atoms/user";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useRecoilState(navState);
  const auth = useRecoilValue(userState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-black flex">
          
          {!show && (
            <div className="flex md:hidden flex-row">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setShow(true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
          <Typography variant="h5">Smart Learn</Typography>
          {auth.user && !auth.isLoading && (
            <>
              <div className="absolute right-1">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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
                  <MenuItem onClick={handleClose}>
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
                  <MenuItem onClick={handleClose}>
                    <IconButton
                      size="medium"
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
            </>
          )}
          {(!auth.user && !auth.isLoading) && (
            <div className="absolute right-1">
              <Button onClick={()=>navigate("/signin")} color="inherit">Sign In</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
