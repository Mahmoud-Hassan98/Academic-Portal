import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./Layout/Layout";
import Courses from "./pages/Courses";
import HomePage from "./pages/HomePage";
import MyCourses from "./pages/MyCourses";
import RequiredAuth from "./Components/RequiredAuth";
import NotFound from "./pages/NotFound404";
import About from "./pages/About";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<RequiredAuth />}>
            <Route path="/my-courses" element={<MyCourses />} />
          </Route>
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
