'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Added missing import
import Sidenav from '@/components/Sidenav';
import { fetchLocations, addLocation, updateItem, deleteItem } from '../../utils/api';

interface Location {
  id: string;
  buildingname: string;
  roomname: string;
  longitude: string;
  latitude: string;
}

function Location() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 15; // Show 15 rows per page
  const [editingId, setEditingId] = useState<string | null>(null); // Track which location is being edited
  const [editedData, setEditedData] = useState<Partial<Location>>({}); // Store edited data

  useEffect(() => {
    const loadLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        const locations = await fetchLocations();
        setData(locations);
      } catch (error) {
        console.error('Error loading locations:', error);
        setError('Failed to load locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadLocations();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const locationData: Omit<Location, 'id'> = {
      buildingname: formData.get('buildingname') as string,
      roomname: formData.get('roomname') as string,
      longitude: formData.get('longitude') as string,
      latitude: formData.get('latitude') as string,
    };

    try {
      const newLocation = await addLocation(locationData);
      setData((prevData) => [...prevData, newLocation]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding location:', error);
      setError('Failed to add location. Please try again.');
    }
  };

  const handleEdit = (location: Location) => {
    setEditingId(location.id);
    setEditedData({
      buildingname: location.buildingname,
      roomname: location.roomname,
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Location) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (locationId: string) => {
    try {
      await updateItem('location', locationId, editedData);
      setEditingId(null);
      const updatedLocations = await fetchLocations();
      setData(updatedLocations);
    } catch (error) {
      console.error('Error updating location:', error);
      setError('Failed to update location. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
    setEditedData({}); // Reset edited data
  };

  const handleCancelForm = () => {
    setShowForm(false); // Hide the form
  };

  const handleDelete = async (locationId: string) => {
    try {
      await deleteItem('location', locationId);
      const updatedLocations = await fetchLocations();
      setData(updatedLocations);
    } catch (error) {
      console.error('Error deleting location:', error);
      setError('Failed to delete location. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidenav />

      <main className="relative w-full p-4 bg-[#ebe9eb]">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg flex-wrap">
          <div className="text-[#961f1f]">
            <h2 className="text-2xl font-bold">Location</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ededed] rounded-lg">
              <i className="fa-solid fa-magnifying-glass text-[#961f1f] text-xl cursor-pointer transition -all duration-500 hover:scale-110"></i>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent px-4 py-2"
              />
            </div>
            <Image
              src="/images/profile2.jpg"
              alt="profile"
              width={50}
              height={50}
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>

        {loading && <p>Loading locations...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="mt-4 p-8 bg-white rounded-lg">
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead className="bg-[#961f1f] text-white">
                <tr>
                  <th className="p-4 text-left">Building Name</th>
                  <th className="p-4 text-left">Room Name</th>
                  <th className="p-4 text-left">Longitude</th>
                  <th className="p-4 text-left">Latitude</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2]">
                {currentData.map((item: Location, index: number) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                    {editingId === item.id ? (
                      <>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.buildingname || ''}
                            onChange={(e) => handleInputChange(e, 'buildingname')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.roomname || ''}
                            onChange={(e) => handleInputChange(e, 'roomname')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.longitude || ''}
                            onChange={(e) => handleInputChange(e, 'longitude')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.latitude || ''}
                            onChange={(e) => handleInputChange(e, 'latitude')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm">
                          <button
                            onClick={() => handleUpdate(item.id)}
                            className="text-green-600 font-semibold hover:text-green-800"
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 font-semibold hover:text-red-800 ml-2"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 text-sm text-[#333333]">{item.buildingname}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.roomname}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.longitude}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.latitude}</td>
                        <td className="p-4 text-sm">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-[#b56b55] font-semibold hover:text-[#4c4c67] mr-2"
                          >
                            Edit
                            <i className="fa-regular fa-pen-to-square ml-2"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 font-semibold hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? 'bg-[#961f1f] text-white'
                    : 'bg-white text-[#961f1f] border-[#961f1f]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 p-8 bg-white rounded-lg">
          <button
            className="p-3 bg-[#961f1f] text-white rounded-lg hover:bg-[#b56b55]"
            onClick={toggleForm}
          >
            Add Location
          </button>

          {showForm && (
            <form className="mt-4 p-3 space-y-4 w-1/2 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="buildingname" className="block text-sm font-medium text-gray-700">
                  Building Name
                </label>
                <input
                  type="text"
                  id="buildingname"
                  name="buildingname"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter building name"
                  required
                />
              </div>
              <div>
                <label htmlFor="roomname" className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  id="roomname"
                  name="roomname"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter room name"
                  required
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter longitude"
                  required
                />
              </div>
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter latitude"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="p-3 bg-[#961f1f] text-white rounded-lg hover:bg-[#b56b55]"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default Location;