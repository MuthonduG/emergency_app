import React from 'react';

function Settings() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mt-4">Settings</h2>
        <div className="flex flex-col mt-4">
          <label className="text-lg text-gray-600">Language:</label>
          <select className="bg-gray-100 p-2 rounded-lg mt-2">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg text-gray-600">Time Zone:</label>
          <select className="bg-gray-100 p-2 rounded-lg mt-2">
            <option>UTC-5</option>
            <option>UTC-4</option>
            <option>UTC-3</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;