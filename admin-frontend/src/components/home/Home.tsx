import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Route,
  Routes,
 } from 'react-router-dom'
import CloseIcon from "@mui/icons-material/Close";
import { navState } from "../../store/atoms/sidebar";
import UserPage from "../user/UserPage";
import CoursePage from "../course/CoursePage";
import { userState } from "../../store/atoms/user";

const Home = () => {
  const [show, setShow] = useRecoilState(navState)
  const userStates = useRecoilValue(userState)
  const navigate = useNavigate();
  useEffect(() => {
    if (!userStates.user && !userStates.isLoading) {
      navigate("/signin");
    }
  });
  return (
    <div className="flex h-screen bg-slate-300">
      <div className="hidden md:flex h-screen flex-initial bg-white">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        {show && (
          <div className="w-screen h-screen fixed flex bg-black bg-opacity-50">
            <div className="relative w-4/5 h-screen animate-slide-in bg-white">
              <div
                className="absolute right-1 cursor-pointer text-white"
                onClick={() => setShow(false)}
              >
                <CloseIcon />
              </div>
              <Sidebar setShow={setShow} />
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <Routes>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/course" element={<CoursePage/>}/>
          <Route path="/enroll" element={<CoursePage/>}/>
          {/* <Route index element={<UserPage/>}/> */}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
