import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import Appbar from "./components/Appbar";
import Notfound from "./components/Notfound";
import SingleCourse from "./components/SingleCourse";
import "./App.css";
import { RecoilRoot } from "recoil";
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <RecoilRoot>
      <Router>
      <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/course/:cid" element={<SingleCourse />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
