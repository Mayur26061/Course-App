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
import SingleContent from "./components/content/SingleContent";
import CreateCourse from "./components/course/CreateCourse";
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
            <Route path="createcourse" element={<CreateCourse />} />
            <Route path="courses" element={<ShowCourses />} />
            <Route path="course/:cid" element={<SingleCourse />} />
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
