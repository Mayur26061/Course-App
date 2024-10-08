import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import { userState } from "./store/atoms/user";
import { useRecoilState } from "recoil";
import { fetchMe } from "./fetch";
import Navbar from "./components/home/Navbar";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setUser({ isLoading: true, user: null });

      const response = await fetchMe();
      setUser({ isLoading: false, user: response });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user.user && !user.isLoading) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/courses" element={<ShowCourses />} /> */}
        {/* <Route path="course/:cid" element={<SingleCourse />} /> */}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Home />} />
        {/* <Route path="course/:co/content/:cid" element={<SingleContent />} /> */}
        {/* <Route path="*" element={<Notfound />} /> */}
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
