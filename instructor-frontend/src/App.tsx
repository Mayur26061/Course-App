import axios from "axios";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Appbar from "./components/common/Appbar";
import Landing from "./components/common/Landing";
import Notfound from "./components/common/Notfound";
import SingleContent from "./components/content/SingleContent";
import CreateCourse from "./components/course/CreateCourse";
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
        const res = await axios.get(`${BASE_URL}/me`, {
          withCredentials:true
        });
        if (res.data.error) {
          setUser({ isLoading: false, user: null });
        } else {
          setUser({ isLoading: false, user: res.data.user });
        }
      } catch {
        setUser({ isLoading: false, user: null });
        console.log("Error");
      }
    };
    fetchme();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Router>
        <Appbar />
        <Routes>
            <Route index element={<Landing />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="createcourse" element={<CreateCourse />} />
            <Route path="courses" element={<ShowCourses />} />
            <Route path="course/:cid" element={<SingleCourse />} />
            <Route
              path="course/:co/content/:cid"
              element={<SingleContent />}
            />
            <Route path="*" element={<Notfound />} />
          <Route index element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
