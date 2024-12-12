import React from 'react';

const UserPermissions = () => {
  return (
    <div className="p-6 shadow-md rounded-lg bg-[rgba(79,84,97,0.8)] text-gray-100">
      <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="role" className="block text-gray-300">User Role</label>
            <select
              id="role"
              className="mt-1 p-2 border border-gray-500 bg-gray-800 text-white rounded-md w-full"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-all"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};


export default UserPermissions;
