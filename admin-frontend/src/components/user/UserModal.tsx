import {
  Modal,
  Box,
  Typography,
  Select,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { boxStyle } from "../../config";
import { updateUser } from "./fetch";
import { checktype, usersDataState, userType } from "../../store/atoms/user";
import { useSetRecoilState } from "recoil";

interface userModalProps {
  handleClose: () => void;
  open: boolean;
  user: userType;
}
interface checktypeinp extends checktype {
  password: string;
}
const checkChanges = (obj1: checktypeinp, obj2: userType): boolean => {
  for (const key in obj1) {
    if (key != "password") {
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    } else if (obj1[key] != "") {
      return true;
    }
  }
  return false;
};
const UserModal: FC<userModalProps> = ({ open, handleClose, user }) => {
  const [userType, setUserType] = useState(user.userType);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [enablePass, setEnablePass] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(usersDataState);

  const onSave = async (ev: { stopPropagation: () => void }) => {
    const obj: {
      name?: string;
      username?: string;
      userType?: string;
      password?: string;
    } = { name, username, userType, password };

    if (obj.name == user.name) {
      delete obj["name"];
    }
    if (obj.username == user.username) {
      delete obj["username"];
    }
    if (obj.userType == user.userType) {
      delete obj["userType"];
    }
    if (obj.password == "") {
      delete obj["password"];
    }

    const response = await updateUser(user.id, obj);
    if (!response.error) {
      console.log(response.user);
      setUser((pre) => {
        return {
          ...pre,
          user: pre.user.map((data) => {
            if (data === user) {
              return response.user;
            } else {
              return data;
            }
          }),
        };
      });
    }
    onCloses(ev);
  };
  const onDelete = async (ev: { stopPropagation: () => void }) => {
   
    setUser((pre) => {
      return {
        ...pre,
        user: pre.user.filter(data=>data!==user),
      };
    });
  };

  useEffect(() => {
    const val = checkChanges({ name, username, password, userType }, user);
    setCanSave(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, username, password, userType]);

  const onCloses = (ev: { stopPropagation: () => void }) => {
    ev.stopPropagation();
    setPassword("");
    setEnablePass(false);
    handleClose();
  };
  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={boxStyle} className="w-full max-w-lg">
        <Typography variant="h6">Edit User Data</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="!mb-2.5"
          variant="outlined"
          label="Name"
          fullWidth={true}
        />
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth={true}
          className="!mb-2.5"
          variant="outlined"
          label="Username"
        />
        <Select
          fullWidth={true}
          className="!mb-2.5"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userType}
          label="Type"
          onChange={(e) => setUserType(e.target.value)}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"instructor"}>Instructor</MenuItem>
          <MenuItem value={"learner"}>Learner</MenuItem>
        </Select>
        {enablePass ? (
          <TextField
            fullWidth={true}
            value={password}
            variant="outlined"
            label="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <Button onClick={() => setEnablePass(true)}>Set Password</Button>
        )}
        <div className="m-2">
          {user.isApproved ? (
            <Button variant="outlined" color="error">
              Unpublished
            </Button>
          ) : (
            <Button variant="contained" color="success">
              Published
            </Button>
          )}
        </div>
        <div className="flex justify-between m-2">
          <div>
            <Button variant="contained" disabled={!canSave} onClick={onSave}>
              Save
            </Button>
            <Button variant="contained" onClick={onCloses}>
              Close
            </Button>
          </div>
          <div>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserModal;
