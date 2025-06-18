import { useRecoilState } from "recoil";
import { userState } from "../../stores/atoms/user";
import SettingsIcon from "@mui/icons-material/Settings";
import UserActions from "./UserActions";
import SecurityIcon from "@mui/icons-material/Security";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const Profile = () => {
  const [user] = useRecoilState(userState);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[420px_1fr]">
      <div className="h-full w-full flex flex-col items-center">
        <div className="flex justify-center px-2 py-4">
          <img
            src={user?.user?.image}
            alt="image"
            className="size-28 rounded-full"
          />
        </div>
        <p className="font-bold text-gray-900">{user.user?.name}</p>
        <p className="font-semibold text-gray-500">{user.user?.username}</p>
      </div>
      <div className="w-full">
        <UserActions title="My Courses" Icon={<DashboardIcon />} />
        <UserActions title="My Creations" Icon={<CreateNewFolderIcon />} />
        <UserActions title="Certificates" Icon={<CardMembershipIcon />} />
        <UserActions title="Change Password" Icon={<SecurityIcon />} />
        <UserActions title="Setting" Icon={<SettingsIcon />} />
        <UserActions title="Sign Out" Icon={<LogoutIcon />} />
      </div>
    </div>
  );
};

export default Profile;
