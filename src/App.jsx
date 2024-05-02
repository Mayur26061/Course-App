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
import { Navigate } from "react-router-dom";

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
