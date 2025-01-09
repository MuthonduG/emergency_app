'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/Sidenav';
import { FaMicrochip } from 'react-icons/fa6';
import { BsFillBuildingFill } from 'react-icons/bs';
import { fetchReports, updateItem, deleteItem } from '../../utils/api';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which report is being edited
  const [editedData, setEditedData] = useState({}); // Store edited data

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportsData = await fetchReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Error loading reports:', error);
      }
    };
    loadReports();
  }, []);

  // Handle edit button click
  const handleEdit = (report) => {
    setEditingId(report.id);
    setEditedData({ ...report }); // Initialize editedData with the current report data
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  // Handle update button click
  const handleUpdate = async (reportId) => {
    try {
      await updateItem('reports', reportId, editedData); // Call the generic update function
      setEditingId(null); // Exit edit mode
      // Refresh reports data
      const updatedReports = await fetchReports();
      setReports(updatedReports);
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  // Handle delete button click
  const handleDelete = async (reportId) => {
    try {
      await deleteItem('reports', reportId); // Call the generic delete function
      // Refresh reports data
      const updatedReports = await fetchReports();
      setReports(updatedReports);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="flex">
      <Sidenav />

      <main className="relative w-full p-4 bg-[#ebe9eb]">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg flex-wrap">
          <div className="text-[#961f1f]">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ededed] rounded-lg">
              <i className="fa-solid fa-magnifying-glass text-[#961f1f] text-xl cursor-pointer transition-all duration-500 hover:scale-110"></i>
              <input type="text" placeholder="search" className="bg-transparent px-4 py-2" />
            </div>
            <Image src="/images/profile2.jpg" alt="profile" width={50} height={50} className="w-12 h-12 rounded-full" />
          </div>
        </div>

        <div className="p-8 bg-white rounded-lg">
          <h3 className="text-[#961f1f] text-base pb-2">Reports</h3>
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead className="bg-[#961f1f] text-white">
                <tr>
                  <th className="p-4 text-left">Report</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2]">
                {reports.map((report, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? "bg-white" : ""}`}>
                    {editingId === report.id ? (
                      <>
                        <td className="p-4 text-sm text-[#333333]">
                          <input
                            type="text"
                            value={editedData.report}
                            onChange={(e) => handleInputChange(e, 'report')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm text-[# 333333]">
                          <input
                            type="text"
                            value={editedData.department}
                            onChange={(e) => handleInputChange(e, 'department')}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="p-4 text-sm flex items-center gap-2">
                          <span className="text-[#333333]">{editedData.status}</span>
                        </td>
                        <td className="p-4 text-sm">
                          <button
                            onClick={() => handleUpdate(report.id)}
                            className="text-green-600 font-semibold hover:text-green-800"
                          >
                            Update
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 text-sm text-[#333333]">{report.report}</td>
                        <td className="p-4 text-sm text-[#333333]">{report.department}</td>
                        <td className="p-4 text-sm flex items-center gap-2">
                          <div className={`p-1 w-2 h-2 rounded-full ${report.status === 'Resolved' ? "bg-[#008000]" : "bg-[#bb1313]"}`}></div>
                          <span className="text-[#333333]">{report.status}</span>
                        </td>
                        <td className="p-4 text-sm">
                          <button
                            onClick={() => handleEdit(report)}
                            className="text-[#b56b55] font-semibold hover:text-[#4c4c67] mr-2"
                          >
                            Edit
                            <i className="fa-regular fa-pen-to-square ml-2"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(report.id)}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;