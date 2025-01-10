'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Sidenav from '@/components/Sidenav';
import { fetchDepartments, addDepartment, updateItem, deleteItem } from '../../utils/api';

interface Department {
  id: string;
  departmentname: string;
  departmentbuilding: string;
  departmentphone: string;
}

function Department() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 15; // Show 15 rows per page
  const [editingId, setEditingId] = useState<string | null>(null); // Track which department is being edited
  const [editedData, setEditedData] = useState<Partial<Department>>({}); // Store edited data

  useEffect(() => {
    const loadDepartments = async () => {
      setLoading(true);
      setError(null);
      try {
        const departments = await fetchDepartments();
        setData(departments);
      } catch (error) {
        console.error('Error loading departments:', error);
        setError('Failed to load departments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
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
    const departmentData: Omit<Department, 'id'> = {
      departmentname: formData.get('departmentname') as string,
      departmentbuilding: formData.get('departmentbuilding') as string,
      departmentphone: formData.get('departmentphone') as string,
    };

    try {
      const newDepartment = await addDepartment(departmentData);
      setData((prevData) => [...prevData, newDepartment]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding department:', error);
      setError('Failed to add department. Please try again.');
    }
  };

  const handleEdit = (department: Department) => {
    setEditingId(department.id);
    setEditedData({
      departmentname: department.departmentname,
      departmentbuilding: department.departmentbuilding,
      departmentphone: department.departmentphone,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Department) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (departmentId: string) => {
    try {
      await updateItem('department', departmentId, editedData);
      setEditingId(null);
      const updatedDepartments = await fetchDepartments();
      setData(updatedDepartments);
    } catch (error) {
      console.error('Error updating department:', error);
      setError('Failed to update department. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
    setEditedData({}); // Reset edited data
  };

  const handleCancelForm = () => {
    setShowForm(false); // Hide the form
  };

  const handleDelete = async (departmentId: string) => {
    try {
      await deleteItem('department', departmentId);
      const updatedDepartments = await fetchDepartments();
      setData(updatedDepartments);
    } catch (error) {
      console.error('Error deleting department:', error);
      setError('Failed to delete department. Please try again.');
    }
  };

  const createDepartment = ()=> {
    try{

    }
    catch(error) {}
  }

  return (
    <div className="flex text-slate-700">
      <Sidenav />

      <main className="relative w-full p-4 bg-[#ebe9eb]">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg flex-wrap">
          <div className="text-[#961f1f]">
            <h2 className='text-2xl font-bold'>Department</h2>
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

        {loading && <p>Loading departments...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="mt-4 p-8 bg-white rounded-lg">
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead className="bg-[#961f1f] text-white">
                <tr>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Building</th>
                  <th className="p-4 text-left">Phone Number</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2]">
                {currentData.map((item: Department, index: number) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                    {editingId === item.id ? (
                      <>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.departmentname || ''}
                            onChange={(e) => handleInputChange(e, 'departmentname')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.departmentbuilding || ''}
                            onChange={(e) => handleInputChange(e, 'departmentbuilding')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="tel"
                            value={editedData.departmentphone || ''}
                            onChange={(e) => handleInputChange(e, 'departmentphone')}
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
                        <td className="p-4 text-sm text-[#333333]">{item.departmentname}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.departmentbuilding}</td>
                        <td className="p-4 text-sm text-[#333333]">{item.departmentphone}</td>
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
            Add Department
          </button>

          {showForm && (
            <form className="mt-4 p-3 space-y-4 w-1/2 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="departmentname" className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentname"
                  name="departmentname"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div>
                <label htmlFor="departmentbuilding" className="block text-sm font-medium text-gray-700">
                  Building
                </label>
                <input
                  type="text"
                  id="departmentbuilding"
                  name="departmentbuilding"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter building name"
                  required
                />
              </div>
              <div>
                <label htmlFor="departmentphone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="departmentphone"
                  name="departmentphone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter phone number"
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

export default Department