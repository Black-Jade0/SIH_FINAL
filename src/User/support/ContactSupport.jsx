import React from 'react';

const ContactSupport = () => {
    return (
      <div className="p-6 w-full box-border shadow-md rounded-lg bg-[rgba(147,197,253,0.8)]">
        <h2 className="text-xl font-semibold mb-4 text-black">Contact Support</h2>
        <form>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="issue" className="block text-gray-800">
                Issue Description
              </label>
              <textarea
                id="issue"
                rows="4"
                className="mt-1 p-2 border border-gray-300 bg-white text-gray-900 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  

export default ContactSupport;
