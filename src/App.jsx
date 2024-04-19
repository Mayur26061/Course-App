import { useEffect } from "react";
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
import { BASE_URL } from "./config";
import axios from "axios";
import { userState } from "./stores/atoms/user";
import { useSetRecoilState } from "recoil";
import SingleContent from "./components/SingleContent";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchme = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/me`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (res.data.user) {
          setUser({ isLoading: false, userEmail: res.data.user });
        } else {
          setUser({ isLoading: false, userEmail: null });
        }
      } catch {
        setUser({ isLoading: false, userEmail: null });
        console.log("Error");
      }
    };
    fetchme();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#eeeeee",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/course/:cid" element={<SingleCourse />} />
          <Route path="/course/:co/content/:cid" element={<SingleContent />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
