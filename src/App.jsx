import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import EduSign from "./Components/EduSign/Sign";
import StuSign from "./Components/StuSign/Sign";
import Choice from "./Components/Choice";
import Edu from "./Educator/edu";
import User from "./User/user";
import UploadPageUser from "./User/UploadforEval";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/EduSign" element={<EduSign />} />
                    <Route path="/StuSign" element={<StuSign />} />
                    <Route path="/Choice" element={<Choice />} />
                    <Route path="/Edu" element={<Edu />} />
                    <Route path="/User" element={<User />} />
                    <Route path="/UploadforEval" element={<UploadPageUser />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
