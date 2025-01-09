import React from 'react';
import Image from 'next/image';

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-lg shadow-md p-4">
        <Image
          src="/images/profile2.jpg"
          alt="profile"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-2xl font-bold mt-4">John Doe</h2>
        <p className="text-lg text-gray-600 mt-2">Software Engineer</p>
        <p className="text-lg text-gray-600 mt-2">john.doe@example.com</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;