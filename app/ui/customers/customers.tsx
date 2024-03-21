'use client';
import { Modal } from '@/app/Shared/Modal';
import { TableLayout } from '@/app/Shared/Tablelayout';
import React, { useState } from 'react';

export const Customer = () => {
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [data, setData] = useState<
    { groupName: string; totalCustomers: number; createdDate: string }[]
  >([]);
  // Initialize with sample data

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  };

  const handleAddGroup = () => {
    const newGroup = {
      groupName: newGroupName,
      totalCustomers: 0,
      createdDate: new Date().toLocaleDateString(),
    };

    setData([...data, newGroup]);
    setNewGroupName('');
    setShowAddGroupForm(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to handle potential null value
    if (file) {
      // Process the file here (e.g., parse it as CSV, read Excel, etc.)
      // Update your data state accordingly
    }
  };

  return (
    <div
      title="Customer Groups"
      action={
        <div className="flex space-x-2">
          <Modal
            title="Add Group"
            isOpen={showAddGroupForm}
            setIsOpen={setShowAddGroupForm}
          >
            <div>
              <input
                type="text"
                value={newGroupName}
                onChange={handleGroupNameChange}
                placeholder="Enter Group Name"
                className="form-control"
              />
              <button className="btn btn-primary mt-8" onClick={handleAddGroup}>
                Add Group
              </button>
            </div>
          </Modal>
          {/* <button className="btn btn-red">
              <span className="material-symbols-outlined !text-base">
                add_circle
              </span>
              <span>Delete Customer Group</span>
            </button>
            <button className="btn btn-green">
              <span className="material-symbols-outlined !text-base">delete</span>
              <span>Empty Customer Group</span>
          </button>*/}
          <label className="btn btn-tonal-primary">
            <span className="material-symbols-outlined !text-base">
              cloud_upload
            </span>
            <span>Import Customers</span>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddGroupForm(true)}
          >
            <span className="material-symbols-outlined !text-base">
              add_circle
            </span>
            <span>Add Customer Group</span>
          </button>
        </div>
      }
    >
      <div>
        <TableLayout>
          <table className="table">
            <thead className="thead">
              <tr>
                <th scope="col" className="th">
                  Group Name
                </th>
                <th scope="col" className="th">
                  Total Customers
                </th>
                <th scope="col" className="th">
                  Created Date
                </th>
                <th scope="col" className="th">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.map((item, index) => (
                <tr key={index} className="tr">
                  <td className="td">{item.groupName}</td>
                  <td className="td">{item.totalCustomers}</td>
                  <td className="td">{item.createdDate}</td>
                  <td className="td">
                    <button className="text-primary-700 hover:bg-primary-50 border-primary-100 flex items-center gap-x-2 rounded border px-3 py-1">
                      <span className="material-symbols-outlined !text-base">
                        delete
                      </span>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableLayout>
      </div>
    </div>
  );
};
