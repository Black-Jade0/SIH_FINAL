import axios from "axios";
import PdfList from "../Educator/PdfList";
import { BASE_URL } from "../../config";
import {React, useState } from "react";
import QuestionPaper from "./OnlineTest";


const TestSelection = ()=>{
    //user will select the question paper then that selected question's metadata is stored and then we hit 
    //the database for getting the file then we send the recevied parsed ouput to OnlineTest component for 
    //rendering the array
    const [subject,setSubject] = useState("");
    const [level, setLevel] = useState("");
    const [data,setData] = useState();
    const requestsender = async ()=>{
        const response = await axios.get(BASE_URL+'/user/getparseddata',{
            withCredentials:true
        },{
            subject,
            level
        });
        console.log("Got the data from backend: ",response.data)
    setData(response.data);
    };
    if(data){
        return(
            <>
            <QuestionPaper data={data.data}/>
            </>
            
        )
    }
return (
    <>
    <PdfList/>
    <div>
        <div className="text-center font-semibold">Enter the subject and level to begin the Test</div>
        
    <input type="text" placeholder="subject" onChange={(e)=>{setSubject(e.target.value)}} />
    <input type="text" placeholder="level" onChange={(e)=>{setLevel(e.target.value)}} />
    <button className="bg-blue-400 w-20 mx-auto" onClick={requestsender}>Take test</button>
    </div>
    
    </>
)
}
export default TestSelection;