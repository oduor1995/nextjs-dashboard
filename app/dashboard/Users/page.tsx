'use client';
import React, { use, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import RegistrationForm from '@/app/ui/dashboard/RegistrationForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import { UserIcon } from '@heroicons/react/24/outline';
import { setFlagsFromString } from 'v8';
import { EditUserForm } from '@/app/ui/dashboard/EditUserForm';
import { seteuid } from 'process';

function CustomTable() {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [editRowId, setEditRowId] = useState();
  const [selectedRowId, setSelectedRowId] = useState();
  const [errorMessage, setErrorMessage] = useState();
  // Initialize formData state using useState hook
  const [formData, setFormData] = useState({
    userProfile: {
      Branch: '',
      Department: '',
      firstName: '',
      lastName: '',
      Email: '',
      Password: '',
      confirmPassword: '',
    },
    senderID: {
      senderID: '',
    },
    userGroup: {
      userGroup: '',
    },
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'collins oduor',
      email: 'collins@example.com',
      department: 'IT',
      branch: 'Finserve',
      userGroup: 'Admin',
      status: 'Active',
    },
    // Initial row data
  ]);

  const handleClick = () => {
    setShowForm(true);
    setShowTable(false);
  };

  const addNewRow = async (formData, row.id) => {
    setSelectedRowId(row.id);
    console.log('Selected row id:', selectedRowId);
    const authToken = localStorage.getItem('accessToken');
    try {
      // Call the API to create a new user
      const response = await fetch(
        'https://api-finserve-dev.finserve.africa/user-manager/api/v1/create/client/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ ...formData, clientId: id }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Parse the API response to get the newly created user data
      const newUser = await response.json();

      // Add the new user to the rows state
      setRows([...rows, newUser]);

      // Optionally close the form and show the table
      setShowForm(false);
      setShowEditUserForm(false);
      setShowTable(true);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error behavior here, such as displaying an error message
    }
  };
  const MyExample = (id) => {
    console.log('Edit row with ID:', id);
  };

  const handleEdit = async (formData: any, id: any) => {
    setEditRowId(id);
    setShowEditUserForm(true);
    setShowTable(false);
    console.log('Edit row with ID:', id);

    // Retrieve the authorization token from local storage
    const authToken = localStorage.getItem('accessToken');

    try {
      // Make the API call to update user data
      const response = await fetch(
        'https://api-finserve-dev.finserve.africa/user-manager/api/v1/edit/client/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Attach authorization token
          },
          body: JSON.stringify({ ...formData, clientId: id }),
        },
      );

      if (response.ok) {
        // Handle success behavior here, like redirecting or showing a success message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set error message state
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error behavior here
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    console.log('Delete row with ID:', id);
  };
  const handleactivate = (id) => {
    console.log('user activated');
  };

  return (
    <>
      <div className="container mx-auto max-w-4xl rounded-lg border p-6">
        <div className=" mb-4 flex h-12 justify-end bg-gray-500">
          <button
            onClick={handleClick}
            className=" mr-4 mt-2 h-8 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            + Add New User
          </button>
        </div>
        {showForm && (
          <RegistrationForm
            onSubmit={(formData) => addNewRow(formData, row.id)}
            id={selectedRowId}
          />
        )}
        {showEditUserForm && (
          <EditUserForm onSubmit={handleEdit} id={editRowId} />
        )}
        {showTable && (
          <div className="relative overflow-x-auto">
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>User Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>User Group</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.branch}</TableCell>
                      <TableCell>{row.userGroup}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <div className="bg-blue absolute right-0 top-0 mt-2 rounded p-2 shadow-lg ">
                            {showActions === row.id && (
                              <>
                                <MenuItem
                                  onClick={() => handleEdit(formData, row.id)}
                                  sx={{
                                    backgroundColor: 'gray',
                                    '&:hover': { backgroundColor: 'blue' },
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent row selection
                                    handleDelete(row.id);
                                  }}
                                  sx={{
                                    backgroundColor: 'gray',
                                    '&:hover': { backgroundColor: 'red' },
                                  }}
                                >
                                  Delete
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleactivate(row.id)}
                                  sx={{
                                    backgroundColor: 'gray',
                                    '&:hover': { backgroundColor: 'green' },
                                  }}
                                >
                                  Activate user
                                </MenuItem>
                                <MenuItem
                                  sx={{
                                    backgroundColor: 'gray',
                                    '&:hover': { backgroundColor: 'orange' },
                                  }}
                                >
                                  Deactivate user
                                </MenuItem>
                              </>
                            )}
                          </div>
                          <IconButton
                            aria-label="actions"
                            onClick={() =>
                              setShowActions(
                                showActions === row.id ? null : row.id,
                              )
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomTable;
