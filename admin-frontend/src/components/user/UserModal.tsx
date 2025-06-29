import {
  Modal,
  Box,
  Typography,
  Select,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserType } from "../../lib/types/user";
import { usersDataState } from "../../store/atoms/user";
import { boxStyle, checkUserChanges } from "../../utils";
import { deleteUserRoute, updateUser } from "./fetch";

interface UserModalProps {
  handleClose: () => void;
  open: boolean;
  user: UserType;
}

const UserModal: FC<UserModalProps> = ({ open, handleClose, user }) => {
  const [userType, setUserType] = useState(user.userType);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [enablePass, setEnablePass] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(usersDataState);

  useEffect(() => {
    const val = checkUserChanges({ name, username, password, userType }, user);
    setCanSave(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, username, password, userType]);

  const setStates = (updatedUser: UserType) => {
    setUser((pre) => {
      return {
        ...pre,
        user: pre.users.map((data) => {
          if (data === user) {
            return updatedUser;
          } else {
            return data;
          }
        }),
      };
    });
  };

  const onSave = async (ev: SyntheticEvent) => {
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
      setStates(response.user);
    }
    onCloses(ev);
  };

  const onDelete = async () => {
    const response = await deleteUserRoute(user.id);
    if (!response.error) {
      setUser((pre) => {
        return {
          ...pre,
          user: pre.users.filter((data) => data !== user),
        };
      });
    }
  };

  const togglePublish = async () => {
    const response = await updateUser(user.id, {
      isApproved: !user.isApproved,
    });
    if (!response.error) {
      console.log(response.user);
      setStates(response.user);
    }
  };

  const onCloses = (ev: SyntheticEvent) => {
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
            <Button onClick={togglePublish} variant="outlined" color="error">
              Unpublish
            </Button>
          ) : (
            <Button onClick={togglePublish} variant="contained" color="success">
              Publish
            </Button>
          )}
        </div>
        <div className="flex justify-between m-2">
          <div className="flex gap-3">
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
