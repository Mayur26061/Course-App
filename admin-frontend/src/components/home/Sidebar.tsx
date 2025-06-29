import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navState } from "../../store/atoms/sidebar";

interface OptionalProps {
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<OptionalProps> = () => {
  const obj = [
    {
      route: "user",
      title: "Users",
    },
    {
      route: "course",
      title: "Course",
    },
    {
      route: "enroll",
      title: "Enrolled Users",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center min-w-350 h-full">
        {obj.map((data, id) => (
          <SidebarItems route={data.route} title={data.title} key={id} />
        ))}
      </div>
    </>
  );
};

interface items {
  route: string;
  title: string;
}
const SidebarItems: FC<items> = ({ route, title }) => {
  const [show, setShow] = useRecoilState(navState);

  return (
    <div className="w-full flex justify-center">
      <NavLink
        onClick={() => {
          if (show) setShow(false);
        }}
        to={"/" + route}
        className={({ isActive }) => (isActive ? "font-bold" : "")}
      >
        <h1 className="p-1 !text-inherit">{title}</h1>
      </NavLink>
    </div>
  );
};

export default Sidebar;
