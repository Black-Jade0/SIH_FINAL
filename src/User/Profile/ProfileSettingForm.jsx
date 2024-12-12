import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { BASE_URL } from '../../../config';

const PDFUploadForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    currentStd: '',
    age: '',
    gender: '',
    fieldofinterest: '',
    stemresponse: '',
    pwdtype: '',
    nameoffile: '',
    documentdata: "",
    contentType: "",
    pdfFile: null
  });

  const [fileName, setFileName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFormData(prev => ({
          ...prev,
          pdfFile: file
        }));
        setFileName(file.name);
      } else {
        alert('Please upload a PDF file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post(
        BASE_URL + "/user/profilesetup",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error in profile setup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-center text-2xl font-bold text-blue-700 mb-6">Profile Setup</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Current Standard/Year Input */}
          <div>
            <label htmlFor="currentStd" className="block text-sm font-medium text-gray-700 mb-1">
              In which class or year are you studying in?
            </label>
            <input
              type="text"
              id="currentStd"
              name="currentStd"
              required
              value={formData.currentStd}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Gender Input */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Field of Interest Input */}
          <div>
            <label htmlFor="fieldofinterest" className="block text-sm font-medium text-gray-700 mb-1">
              Field of interest
            </label>
            <input
              type="text"
              id="fieldofinterest"
              name="fieldofinterest"
              value={formData.fieldofinterest}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* STEM Response Input */}
          <div>
            <label htmlFor="stemresponse" className="block text-sm font-medium text-gray-700 mb-1">
              Which stream of education you are pursuing 
            </label>
            <input
              type="text"
              id="stemresponse"
              name="stemresponse"
              value={formData.stemresponse}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* PWD Type Input */}
          <div>
            <label htmlFor="pwdtype" className="block text-sm font-medium text-gray-700 mb-1">
              Type of disability (Optional)
            </label>
            <input
              type="text"
              id="pwdtype"
              name="pwdtype"
              value={formData.pwdtype}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload PDF (Optional)
            </label>
            <div className="mt-1 flex items-center">
              <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="h-5 w-5 mr-2 text-gray-400" />
                <span>{fileName || 'Choose PDF file'}</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {fileName && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                <span>{fileName}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PDFUploadForm;
