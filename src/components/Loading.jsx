import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <CircularProgress />
    </div>
  );
};
