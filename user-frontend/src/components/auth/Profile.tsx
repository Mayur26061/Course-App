import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../common/fetch";
import { userState } from "../../stores/atoms/user";
import Notfound from "../common/Notfound";
import UserAction from "./UserAction";

const Profile = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const onLogOut = async () => {
    await logOutAction();
    setUser({
      isLoading: false,
      user: null,
    });
    navigate("/signin");
  };

  if (!user.user) {
    return <Notfound />;
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[420px_1fr]">
      <div className="h-full w-full flex flex-col items-center">
        <div className="flex justify-center px-2 py-4">
          <img
            src={user.user.image || ""}
            alt="image"
            className="size-28 rounded-full"
          />
        </div>
        <p className="font-bold text-gray-900">{user.user?.name}</p>
        <p className="font-semibold text-gray-500">{user.user?.username}</p>
      </div>
      <div className="w-full">
        <UserAction
          title="My Courses"
          Icon={<DashboardIcon />}
          action={() => {
            navigate("mycourses");
          }}
        />
        <UserAction
          title="My Creations"
          Icon={<CreateNewFolderIcon />}
          action={() => {
            navigate("creations");
          }}
        />
        <UserAction
          title="Certificates"
          Icon={<CardMembershipIcon />}
          action={() => {
            navigate("certificates");
          }}
        />
        <UserAction
          title="Change Password"
          Icon={<SecurityIcon />}
          action={() => {
            navigate("mycourses");
          }}
        />
        <UserAction
          title="Setting"
          Icon={<SettingsIcon />}
          action={() => {
            navigate("setting");
          }}
        />
        <UserAction title="Sign Out" Icon={<LogoutIcon />} action={onLogOut} />
      </div>
    </div>
  );
};

export default Profile;
