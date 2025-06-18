import { SvgIconOwnProps } from "@mui/material";
import React, { FC } from "react";

interface userActionProps {
  title: string;
  Icon: React.ReactElement<SvgIconOwnProps>;
}
const UserActions: FC<userActionProps> = ({ title, Icon }) => {
  return (
    <div className="cursor-pointer px-2 py-4 my-1 border border-gray-300 w-full text-gray-600 hover:text-gray-950 transition-all flex items-center gap-2">
      {Icon}
      {title}
    </div>
  );
};

export default UserActions;
