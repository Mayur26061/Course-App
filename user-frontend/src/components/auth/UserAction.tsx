import { SvgIconOwnProps } from "@mui/material";
import React, { FC } from "react";

interface UserActionProps {
  title: string;
  Icon: React.ReactElement<SvgIconOwnProps>;
  action: (() => Promise<void>) | (() => void);
}

const UserAction: FC<UserActionProps> = ({ title, Icon, action }) => {
  const handleClick = async () => {
    await action();
  };

  return (
    <div
      className="cursor-pointer px-2 py-4 my-1 border border-gray-300 w-full text-gray-600 hover:text-gray-950 transition-all flex items-center gap-2"
      onClick={handleClick}
    >
      {Icon}
      {title}
    </div>
  );
};

export default UserAction;
