const PWDresult = ({ data })=>{
 //render the evaluation recevied !
 const { obtainedMarks, totalMarks, summary } = data;

    return (
        <>
        <div className="response-container border p-4 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Performance Summary</h2>
      <p>
        <strong>Obtained Marks:</strong> {obtainedMarks}
      </p>
      <p>
        <strong>Total Marks:</strong> {totalMarks}
      </p>
      <p>
        <strong>Summary:</strong> {summary}
      </p>
      <div className="progress-bar mt-4">
        <div
          className="progress"
          style={{
            width: `${(obtainedMarks / totalMarks) * 100}%`,
            backgroundColor: "#4caf50",
            height: "10px",
          }}
        ></div>
      </div>
    </div>
        </>
    )
}

export default PWDresult;