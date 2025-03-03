import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./Components/Home";
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
import SpeechToText from "./Components/SpeechToText";
import TestSelection from "./Test/TestSelection";
import QuestionPaper from "./Test/OnlineTest";
import ProfileSettingForm from "./User/Profile/ProfileSettingForm";
import EvaluationResults from "./User/Result/Evaluation";
import PWDhome from "./User/PWD/home";
import PWDtest from "./User/PWD/Test/TestSelection";
import PWDquestionpaper from "./User/PWD/Test/OnlineTest";
import CareerAdvisorSelector from "./User/test/CareerAdvisorSelection";
import GoogleTranslate from "../Backend/src/GoogleTranslate";
import DifficultySelector from "./DynamicTests/DynamicTestGeneration";

function App() {
    return (
        <RecoilRoot>
            <Router>
            <div className="translate-wrapper">
                        <GoogleTranslate />
                    </div>
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
                    <Route path="/User/Evaluation" element={<EvaluationResults />} />
                    <Route path="/speechtotext" element={<SpeechToText />} />
                    <Route path="/onlinetest" element={<TestSelection />} />
                    <Route path="/question-paper" element={<QuestionPaper />} />
                    <Route path="/Profilesetup" element={<ProfileSettingForm />} />
                    <Route path="/careerrecommend" element={<CareerAdvisorSelector />} />
                    <Route path="/User/PWD" element={<PWDhome />} />
                    <Route path="/User/PWD/Test" element={<PWDtest />} />
                    <Route path="/User/PWD/Test/questionpaper" element={<PWDquestionpaper />} />
                    <Route path="/dynamicquestions" element={<DifficultySelector />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
