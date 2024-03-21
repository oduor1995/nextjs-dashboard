'use client';
import React, { useState } from 'react';

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    clientId: 1,
    roleCode: 'CUSA',
  });

  const [isFormVisible, setIsFormVisible] = useState(true); // Track form visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://api-finserve-dev.finserve.africa/user-manager/api/v1/create/client/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      console.log('User created successfully');

      // Hide the form after successful submission
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const successMessage = 'user created succesfully';

  if (!isFormVisible) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="rounded-md bg-green-100 px-4 py-2 text-center text-green-700">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg rounded-md bg-white p-4 shadow-md"
    >
      <div className="mb-4">
        <label className="mb-1 block">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block">Email Address:</label>
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
      >
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;
