import { useRecoilState } from "recoil";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { navState } from "../../store/atoms/sidebar";
import UserPage from "../user/UserPage";
import CoursePage from "../course/CoursePage";
import Enrolled from "../enrolled/Enrolled";
import SingleCourse from "../course/course/SingleCourse";

const Home = () => {
  const [show, setShow] = useRecoilState(navState);
  return (
    <div className="flex bg-slate-300 h-full flex-row ">
      <div className="hidden md:flex h-370 flex-initial bg-slate-300">
          <Sidebar />
      </div>
      <div className="flex md:hidden flex-row z-20">
        {show && (
          <div className="w-screen h-screen fixed flex bg-black bg-opacity-50">
            <div className="relative w-4/5 h-screen animate-slide-in bg-white">
              <div
                className="absolute right-1 cursor-pointer text-white"
                onClick={() => setShow(false)}
              >
                <CloseIcon color="action" />
              </div>
              <Sidebar setShow={setShow} />
            </div>
          </div>
        )}
      </div>
      <div className="p-2 w-full max-h-screen overflow-auto">
        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/enroll" element={<Enrolled />} />
          <Route path="/course/:cid" element={<SingleCourse />} />
        </Routes>
    </div>
    </div>
  );
};

export default Home;
