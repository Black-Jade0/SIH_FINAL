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
import UploadEduPdf from "./Educator/EducatorUpload";
import Tempquestionupload from "./Components/Tempquesetionupload";
import InstructionPage from "./User/test/Instruction";
import Uploadans from "./User/test/Uploadans";
import Evaluation from "./User/Result/Evaluation";
import SpeechToText from "./Components/SpeechToText";
import TestSelection from "./Test/TestSelection";
import ProfileSettingForm from "./User/Profile/ProfileSettingForm";

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
                    <Route path="/uploadquestions" element={<UploadEduPdf />} />
                    <Route path="/UploadforEval" element={<UploadPageUser />} />
                    <Route path="/tempquestionupload" element={<Tempquestionupload />} />
                    <Route path="/User/Test/instructions" element={<InstructionPage />} />
                    <Route path="/User/Test/uploadans" element={<Uploadans />} />
                    <Route path="/User/Evaluation" element={<Evaluation />} />
                    <Route path="/speechtotext" element={<SpeechToText />} />
                    <Route path="/onlinetest" element={<TestSelection />} />
                    <Route path="/Profilesetup" element={<ProfileSettingForm />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
