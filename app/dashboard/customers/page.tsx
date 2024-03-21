'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from '@/app/Shared/Modal';
import { TableLayout } from '@/app/Shared/Tablelayout';
import { Trash2 } from 'react-feather';
import { useGroup } from '@/app/GroupContext';

export const Customer = () => {
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [showImportCustomersForm, setShowImportCustomersForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [data, setData] = useState([]);
  const { selectedGroup, selectGroup, availableGroups, addGroup } = useGroup();
  const handleGroupNameChange = (e) => {
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

    // Update the list of available groups in the context
    addGroup(newGroupName);

    // Use the selectGroup function to update the selected group in the context
    selectGroup(newGroupName);
    setShowAddGroupForm(false);
  };
  useEffect(() => {
    // Access selectedGroup here or perform any other logic based on its changes
    console.log('Selected Group:', selectedGroup);
  }, [selectedGroup]);

  const handleFileUpload = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput?.files?.[0];

    if (file) {
      // Assuming 'group_name' is the correct field name
      const formData = new FormData();
      formData.append('file', file);
      formData.append('group_name', selectedGroup);

      // Upload the file and group name directly to the Express server
      fetch('http://localhost:3000/dashboard/api', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('File uploaded successfully:', data);

          // Additional logic if needed
        })
        .catch((error) => {
          console.error('Error uploading file:', error);

          // Handle errors if needed
        });
    }

    // Close the modal after handling the file upload
    setShowImportCustomersForm(false);
  };

  const handleImportCustomers = () => {
    // Set the state to indicate that the modal should be shown
    setShowImportCustomersForm(true);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    const deletedGroup = updatedData[index].groupName;

    // Remove the item at the specified index
    updatedData.splice(index, 1);
    setData(updatedData);
    console.log('Deleted group:', deletedGroup);

    // If the deleted group is the selected group, set selectedGroup to null
    if (selectedGroup === deletedGroup) {
      selectGroup(null);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {/* Add Group Modal */}
        <Modal
          title="Add Group"
          isOpen={showAddGroupForm}
          setIsOpen={setShowAddGroupForm}
        >
          <div style={{ padding: '16px' }}>
            <label>Enter Group Name:</label>
            <input
              type="text"
              value={newGroupName}
              onChange={handleGroupNameChange}
              style={{
                borderWidth: '1px',
                borderColor: '#3498db',
                borderRadius: '4px',
                padding: '8px',
                outline: 'none',
                width: '100%',
              }}
              placeholder="Group Name"
            />
            <button
              style={{
                backgroundColor: '#3498db',
                color: '#fff',
                borderRadius: '4px',
                padding: '8px',
                cursor: 'pointer',
                outline: 'none',
                marginTop: '10px',
              }}
              onClick={handleAddGroup}
            >
              Add Group
            </button>
          </div>
        </Modal>

        {/* Import Customers Modal */}
        <Modal
          title="Import Customers"
          isOpen={showImportCustomersForm}
          setIsOpen={setShowImportCustomersForm}
        >
          <div style={{ padding: '16px' }}>
            <label>Select Group:</label>
            <select
              value={selectedGroup || ''}
              onChange={(e) => selectGroup(e.target.value)}
              style={{
                borderWidth: '1px',
                borderColor: '#3498db',
                borderRadius: '4px',
                padding: '8px',
                outline: 'none',
                marginBottom: '10px',
              }}
            >
              <option value="" disabled>
                Choose a group...
              </option>
              {availableGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <label>Choose File:</label>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              id="fileInput"
              style={{ marginBottom: '10px' }}
            />

            <button
              style={{
                backgroundColor: '#3498db',
                color: '#fff',
                borderRadius: '4px',
                padding: '8px',
                cursor: 'pointer',
                outline: 'none',
              }}
              onClick={handleFileUpload}
            >
              Import Customers
            </button>
          </div>
        </Modal>

        {/* Add Customer Group Button */}
        <button
          style={{
            backgroundColor: '#3498db',
            color: '#fff',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer',
            outline: 'none',
          }}
          onClick={() => setShowAddGroupForm(true)}
        >
          <span>Add Customer Group</span>
        </button>

        {/* Import Customers Button */}
        {/* Import Customers Button */}
        <label
          style={{
            backgroundColor: '#ebf8ff',
            color: '#3498db',
            borderWidth: '1px',
            borderColor: '#bee3f8',
            borderRadius: '4px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            outline: 'none',
          }}
          onClick={() => setShowImportCustomersForm(true)}
        >
          <span>Import Customers</span>
        </label>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          style={{ display: 'none' }}
          onChange={() => setShowImportCustomersForm(true)}
        />
      </div>

      <div>
        <TableLayout>
          <table className="table w-full">
            <thead className="thead">
              <tr>
                <th scope="col" className="th w-1/4 text-left">
                  Group Name
                </th>
                <th scope="col" className="th w-1/4 text-left">
                  Total Customers
                </th>
                <th scope="col" className="th w-1/4 text-left">
                  Created Date
                </th>
                <th scope="col" className="th w-1/4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.map((item, index) => (
                <tr key={index} className="tr">
                  <td className="td w-1/4 text-left">{item.groupName}</td>
                  <td className="td w-1/4 text-left">{item.totalCustomers}</td>
                  <td className="td w-1/4 text-left">{item.createdDate}</td>
                  <td className="td w-1/4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="flex w-full cursor-pointer items-center justify-center rounded border border-red-500 px-3 py-1 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 text-base" />
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

export default Customer;
