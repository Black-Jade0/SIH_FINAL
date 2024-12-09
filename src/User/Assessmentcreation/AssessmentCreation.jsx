import React from 'react';

const AssessmentCreation = () => {
  return (
    <section className="w-full box-border h-auto p-4 lg:p-6 overflow-auto">
      <div className="max-w-3xl mx-auto  rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Assessment</h1>
        
        <form>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
            <select className="block w-full p-2 border border-gray-300 rounded-lg">
              <option>MCQ</option>
              <option>Descriptive</option>
              <option>Practical</option>
              <option>Viva Voce</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Mode</label>
            <select className="block w-full p-2 border border-gray-300 rounded-lg">
              <option>Online</option>
              <option>Offline</option>
              <option>Blended</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
            <input type="range" min="1" max="5" className="w-full" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Inclusivity Options</label>
            <input type="text" className="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Accessibility features" />
          </div>
          {/* <div
           {/* <select
              name="inclusivity"
              value={formData.inclusivity}
              onChange={handleChange} */}
            
              {/* <option value="">Select Inclusivity Options</option>
              <option value="Voice-to-Text">Voice-to-Text</option>
              <option value="Text-to-Speech">Text-to-Speech</option>
              <option value="Alternative Input Methods">Alternative Input Methods</option>
              <option value="Customizable Formats">Customizable Formats</option> */}
            {/* </select> */}
        {/* </form> </div> */} */
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Content</label>
            <textarea className="block w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Upload questions, instructions, guidelines"></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Duration & Settings</label>
            <input type="text" className="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Set duration and other settings" />
          </div>
          
          <button type="submit" className="text-white px-6 py-2 rounded-lg hover:bg-[var(--main-color)] transition duration-300">
            Create Assessment
          </button>
        </form>
      </div>
    </section>
  );
};

export default AssessmentCreation;
