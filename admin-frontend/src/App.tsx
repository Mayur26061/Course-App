import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router,
  Route,
  Routes,
 } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home'
import { userState } from './store/atoms/user'
import { useSetRecoilState } from 'recoil'
import { fetchMe } from './fetch'
import Navbar from './components/home/Navbar'

function App() {
  const setUser = useSetRecoilState(userState)
  useEffect(() => {
    const fetchUser = async () => {
      setUser({ isLoading: false, user: await fetchMe() });
    };
    fetchUser();
  }, []);
  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          {/* <Route path="/courses" element={<ShowCourses />} /> */}
          {/* <Route path="course/:cid" element={<SingleCourse />} /> */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path='*' element={<Home/>} />
          {/* <Route path="course/:co/content/:cid" element={<SingleContent />} /> */}
          {/* <Route path="*" element={<Notfound />} /> */}
          <Route/>
          <Route/>
        </Routes>
      </Router>
    </>
  )
}

export default App
