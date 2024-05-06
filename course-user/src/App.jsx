import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from './src/components/Notfound';
import Appbar from './src/components/Appbar';
import ShowCourses from './src/components/ShowCourses';
import { Navigate } from "react-router-dom";
import SingleCourse from './src/components/SingleCourse';
import Register from './src/components/Register';
import Login from './src/components/Login';
import { useSetRecoilState } from 'recoil';
import { userState } from './src/stores/atoms/user';
import axios from 'axios';
import { BASE_URL } from './config';
import SingleContent from './src/components/SingleContent';
function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchme = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/me`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("client-token"),
          },  
        });
        console.log(res.statusText)
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
        <Route path="/">
        <Route exact path="/courses" element={<ShowCourses />} />
        <Route index element={<Navigate to="/courses" replace />} />
        <Route exact path="course/:cid" element={<SingleCourse />} />
        <Route exact path="signin" element={<Login />} />
        <Route exact path="signup" element={<Register />} />
        <Route
          exact
          path="course/:co/content/:cid"
          element={<SingleContent />}
        />

          {/* <Route index element={} />
          <Route exact path="createcourse" element={<CreateCourse />} />
          <Route exact path="*" element={<Notfound />} /> */}
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App
