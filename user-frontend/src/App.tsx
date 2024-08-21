import axios from "axios";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Notfound from "./components/common/Notfound";
import Appbar from "./components/common/Appbar";
import SingleContent from "./components/content/SingleContent";
import ShowCourses from "./components/course/ShowCourses";
import SingleCourse from "./components/course/SingleCourse";
import { userState } from "./stores/atoms/user";
import { BASE_URL } from "./config";
import "./App.css";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchme = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/learner/me`, {
          withCredentials:true
        });
        if (res.data.user) {
          setUser({ isLoading: false, userEmail: res.data.user });
        } else {
          setUser({ isLoading: false, userEmail: null });
        }
      } catch {
        setUser({ isLoading: false, userEmail: null });
        // console.log("Error");
      }
    };
    fetchme();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <Router>
        <Appbar />
        <Routes>
            <Route index element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<ShowCourses />} />
            <Route path="course/:cid" element={<SingleCourse />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route
              path="course/:co/content/:cid"
              element={<SingleContent />}
            />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
