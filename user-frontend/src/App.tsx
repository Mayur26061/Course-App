import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Login from "./components/auth/Login";
import MyProfileRoute from "./components/auth/MyProfileRoute";
import Profile from "./components/auth/Profile";
import Register from "./components/auth/Register";
import Appbar from "./components/common/Appbar";
import Notfound from "./components/common/Notfound";
import SingleContent from "./components/content/SingleContent";
import SearchCourses from "./components/course/SearchCourses";
import ShowCourses from "./components/course/ShowCourses";
import SingleCourse from "./components/course/SingleCourse";
import { userState } from "./stores/atoms/user";
import "./App.css";
import { fetchMe } from "./fetch";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchUser = async () => {
      setUser({ isLoading: false, user: await fetchMe() });
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <Router future={{ v7_relativeSplatPath: true }}>
        <Appbar />
        <Routes>
          <Route index element={<Navigate to="/courses" replace />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="course/:cid" element={<SingleCourse />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="course/:co/content/:cid" element={<SingleContent />} />
          <Route path="search" element={<SearchCourses />} />
          <Route path="my" element={<Profile />} />
          <Route path="my/*" element={<MyProfileRoute />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
