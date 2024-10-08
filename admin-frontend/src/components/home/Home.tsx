import { useRecoilState } from "recoil";
import Sidebar from "./Sidebar";
import {
  Route,
  Routes,
 } from 'react-router-dom'
import CloseIcon from "@mui/icons-material/Close";
import { navState } from "../../store/atoms/sidebar";
import UserPage from "../user/UserPage";
import CoursePage from "../course/CoursePage";
import Enrolled from "../enrolled/Enrolled";

const Home = () => {
  const [show, setShow] = useRecoilState(navState)
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
                <CloseIcon color="action" />
              </div>
              <Sidebar setShow={setShow} />
            </div>
          </div>
        )}
      </div>
      <div className="p-2 w-full overflow-hidden max-w-3xl">
        <Routes>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/course" element={<CoursePage/>}/>
          <Route path="/enroll" element={<Enrolled/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
