'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Added missing import
import Sidenav from '@/components/Sidenav';
import { fetchDevices, addDevice, updateItem, deleteItem } from '../../utils/api';

interface Device {
  id: string;
  devicesernum: string;
  devicebuilding: string;
  deviceroom: string;
  devicestatus: string;
}

function Device() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 15; // Show 15 rows per page
  const [editingId, setEditingId] = useState<string | null>(null); // Track which device is being edited
  const [editedData, setEditedData] = useState<Partial<Device>>({}); // Store edited data

  useEffect(() => {
    const loadDevices = async () => {
      setLoading(true);
      setError(null);
      try {
        const devices = await fetchDevices();
        setData(devices);
      } catch (error) {
        console.error('Error loading devices:', error);
        setError('Failed to load devices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
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
    const deviceData: Omit<Device, 'id'> = {
      devicesernum: formData.get('devicesernum') as string,
      devicebuilding: formData.get('devicebuilding') as string,
      deviceroom: formData.get('deviceroom') as string,
      devicestatus: 'active', // Default status
    };

    try {
      const newDevice = await addDevice(deviceData);
      setData((prevData) => [...prevData, newDevice]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding device:', error);
      setError('Failed to add device. Please try again.');
    }
  };

  const handleEdit = (device: Device) => {
    setEditingId(device.id);
    setEditedData({
      devicesernum: device.devicesernum,
      devicebuilding: device.devicebuilding,
      deviceroom: device.deviceroom,
      devicestatus: device.devicestatus,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Device) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (deviceId: string) => {
    try {
      await updateItem('device', deviceId, editedData);
      setEditingId(null);
      const updatedDevices = await fetchDevices();
      setData(updatedDevices);
    } catch (error) {
      console.error('Error updating device:', error);
      setError('Failed to update device. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
    setEditedData({}); // Reset edited data
  };

  const handleCancelForm = () => {
    setShowForm(false); // Hide the form
  };

  const handleDelete = async (deviceId: string) => {
    try {
      await deleteItem('device', deviceId);
      const updatedDevices = await fetchDevices();
      setData(updatedDevices);
    } catch (error) {
      console.error('Error deleting device:', error);
      setError('Failed to delete device. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidenav />

      <main className="relative w-full p-4 bg-[#ebe9eb]">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg flex-wrap">
          <div className="text-[#961f1f]">
            <h2 className="text-2xl font-bold">Device</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ededed] rounded-lg">
              <i className="fa-solid fa-magnifying-glass text-[#961f1f] text-xl cursor-pointer transition-all duration-500 hover:scale-110"></i>
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

        {loading && <p>Loading devices...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="mt-4 p-8 bg-white rounded-lg">
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead className="bg-[#961f1f] text-white">
                <tr>
                  <th className="p-4 text-left">Serial Number</th>
                  <th className="p-4 text-left">Building</th>
                  <th className="p-4 text-left">Room</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2]">
                {currentData.map((item: Device, index: number) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                    {editingId === item.id ? (
                      <>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.devicesernum || ''}
                            onChange={(e) => handleInputChange(e, 'devicesernum')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.devicebuilding || ''}
                            onChange={(e) => handleInputChange(e, 'devicebuilding')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.deviceroom || ''}
                            onChange={(e) => handleInputChange(e, 'deviceroom')}
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
                        <td className="p-4 text-sm text-[#333333]">{item.devicesernum}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.devicebuilding}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.deviceroom}</td>
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
            Add Device
          </button>

          {showForm && (
            <form className="mt-4 p-3 space-y-4 w-1/2 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="devicesernum" className="block text-sm font-medium text-gray-700">
                  Device Serial Number
                </label>
                <input
                  type="text"
                  id="devicesernum"
                  name="devicesernum"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter device serial number"
                  required
                />
              </div>
              <div>
                <label htmlFor="devicebuilding" className="block text-sm font-medium text-gray-700">
                  Building
                </label>
                <input
                  type="text"
                  id="devicebuilding"
                  name="devicebuilding"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter building name"
                  required
                />
              </div>
              <div>
                <label htmlFor="deviceroom" className="block text-sm font-medium text-gray-700">
                  Room
                </label>
                <input
                  type="text"
                  id="deviceroom"
                  name="deviceroom"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter room number"
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

export default Device;