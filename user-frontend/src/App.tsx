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
import { fetchMe } from "./fetch";
import "./App.css";
import SearchCourses from "./components/course/SearchCourses";

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
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
