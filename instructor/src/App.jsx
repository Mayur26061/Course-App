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
        const res = await axios.get(`${BASE_URL}/api/instructor/me`, {
          withCredentials:true
        });
        if (res.data.error) {
          setUser({ isLoading: false, userEmail: null });
        } else {
          setUser({ isLoading: false, userEmail: res.data.user });
        }
      } catch {
        setUser({ isLoading: false, userEmail: null });
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
          <Route path="/admin">
            <Route index element={<Landing />} />
            <Route exact path="signin" element={<Login />} />
            <Route exact path="signup" element={<Register />} />
            <Route exact path="createcourse" element={<CreateCourse />} />
            <Route exact path="courses" element={<ShowCourses />} />
            <Route exact path="course/:cid" element={<SingleCourse />} />
            <Route
              exact
              path="course/:co/content/:cid"
              element={<SingleContent />}
            />
            <Route exact path="*" element={<Notfound />} />
          </Route>
          <Route index element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
