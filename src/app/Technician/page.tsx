'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/Sidenav';
import { fetchTechnician, registerTechnician, updateItem, deleteItem } from '../../utils/api';

interface Technician {
  id: string;
  userid: string;
  email: string;
  phone: string;
  status: string;
}

function Technician() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Technician[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 15; // Show 15 rows per page
  const [editingId, setEditingId] = useState<string | null>(null); // Track which technician is being edited
  const [editedData, setEditedData] = useState<Partial<Technician>>({}); // Store edited data

  useEffect(() => {
    const loadTechnicians = async () => {
      setLoading(true);
      setError(null);
      try {
        const technicians = await fetchTechnician();
        setData(technicians.response);
      } catch (error) {
        console.error('Error loading technicians:', Response.error);
        setError('Failed to load technicians. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadTechnicians();
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
    const technicianData: Omit<Technician, 'id'> = {
      userid: formData.get('userid') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      status: 'active', // Default status
    };

    try {
      const newTechnician = await registerTechnician(technicianData);
      setData((prevData) => [...prevData, newTechnician]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding technician:', error);
      setError('Failed to add technician. Please try again.');
    }
  };

  const handleEdit = (technician: Technician) => {
    setEditingId(technician.id);
    setEditedData({
      userid: technician.userid,
      email: technician.email,
      phone: technician.phone,
      status: technician.status,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Technician) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (technicianId: string) => {
    try {
      await updateItem('technician', technicianId, editedData);
      setEditingId(null);
      const updatedTechnicians = await fetchTechnician();
      setData(updatedTechnicians);
    } catch (error) {
      console.error('Error updating technician:', error);
      setError('Failed to update technician. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
    setEditedData({}); // Reset edited data
  };

  const handleCancelForm = () => {
    setShowForm(false); // Hide the form
  };

  const handleDelete = async (technicianId: string) => {
    try {
      await deleteItem('technician', technicianId);
      const updatedTechnicians = await fetchTechnician();
      setData(updatedTechnicians);
    } catch (error) {
      console.error('Error deleting technician:', error);
      setError('Failed to delete technician. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidenav />

      <main className="relative w-full p-4 bg-[#ebe9eb]">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg flex-wrap">
          <div className="text-[#961f1f]">
            <h2 className="text-2xl font-bold">Technician</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ededed ] rounded-lg">
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

        {loading && <p>Loading technicians...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="mt-4 p-8 bg-white rounded-lg">
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead className="bg-[#961f1f] text-white">
                <tr>
                  <th className="p-4 text-left">User  ID</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2]">
                {currentData.map((item: Technician, index: number) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                    {editingId === item.id ? (
                      <>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.userid || ''}
                            onChange={(e) => handleInputChange(e, 'userid')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="email"
                            value={editedData.email || ''}
                            onChange={(e) => handleInputChange(e, 'email')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.phone || ''}
                            onChange={(e) => handleInputChange(e, 'phone')}
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
                        <td className="p-4 text-sm text-[#333333]">{item.userid}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.email}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.phone}</td>
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
            Add Technician
          </button>

          {showForm && (
            <form className="mt-4 p-3 space-y-4 w-1/2 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter technician's user ID"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter technician's email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter technician's phone number"
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

export default Technician;