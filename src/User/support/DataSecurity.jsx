import React from 'react';

const DataSecurity = () => {
    return (
      <div className="p-6 w-full box-border shadow-md rounded-lg bg-[rgba(30,30,31,0.9)] text-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Data Security Settings</h2>
        <form>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="encryption" className="block text-gray-300">
                Encryption
              </label>
              <select
                id="encryption"
                className="mt-1 p-2 border border-gray-600 bg-gray-700 text-white rounded-md w-full"
              >
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };
  

export default DataSecurity;
