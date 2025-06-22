import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Appbar from "./components/common/Appbar";
import Landing from "./components/common/Landing";
import Notfound from "./components/common/Notfound";
import ShowCourses from "./components/course/ShowCourses";
import SingleCourse from "./components/course/SingleCourse";
import "./App.css";
import { useFetchMe } from "./fetch";

function App() {
  useFetchMe()
  return (
    <div className="flex flex-col w-full">
      <Router>
        <Appbar />
        <Routes>
            <Route index element={<Landing />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="courses" element={<ShowCourses />} />
            <Route path="course/:cid" element={<SingleCourse />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
