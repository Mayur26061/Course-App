import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Login from "./components/auth/Login";
import MyProfileRoute from "./components/auth/MyProfileRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import Appbar from "./components/common/Appbar";
import Notfound from "./components/common/Notfound";
import SingleContent from "./components/content/SingleContent";
import SearchCourses from "./components/course/SearchCourses";
import ShowCourses from "./components/course/ShowCourses";
import SingleCourse from "./components/course/SingleCourse";
import { userState } from "./stores/atoms/user";
import "./App.css";
import { fetchMe } from "./fetch";
import { Loading } from "./components/common/Loading";

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const fetchUser = async () => {
      setUser({ isLoading: false, user: await fetchMe() });
    };
    fetchUser();
  }, []);
  if (user.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Router future={{ v7_relativeSplatPath: true }}>
        <Appbar />
        <div className="max-w-screen-2xl w-full mx-auto mt-10">
          <Routes>
            <Route index element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<ShowCourses />} />
            <Route path="course/:cid" element={<SingleCourse />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="search" element={<SearchCourses />} />
            {user.user && (
              <>
                <Route path="course/:co/content/:cid" element={<SingleContent />} />
                <Route path="my/*" element={<MyProfileRoute />} />
                <Route path="checkout" element={<Checkout />} />
              </>
            )}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
