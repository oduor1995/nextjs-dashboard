'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Aesutils from '@/app/lib/encryption';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const aesutils = new Aesutils();

interface UserProfile {
  Branch: string;
  Department: string;
  firstName: string;
  lastName: string;
  Email: string;
  Password: string;
  confirmPassword: string;
}

interface SenderID {
  senderID: string;
}

interface UserGroup {
  userGroup: string;
}

interface FormData {
  userProfile: UserProfile;
  userGroup: UserGroup;
  senderID: SenderID;
}
interface RegistrationFormProps {
  onSubmit: (formData: any) => void; // Use a more specific type instead of 'any' if possible
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const Branches = [
    { code: '001', name: 'head Office' },
    { code: '002', name: 'Finserve' },
    { code: '003', name: 'Moi Avenue' },
  ];

  const [formData, setFormData] = useState<FormData>({
    userProfile: {
      Branch: '',
      Department: 'KE',
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    category: keyof FormData,
    field: string,
  ) => {
    const newFormData = { ...formData };
    (newFormData[category] as any)[field] = e.target.value;
    setFormData(newFormData);
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { lastName, firstName, Email, Department, Branch } =
      formData.userProfile;
    const { userGroup } = formData.userGroup;
    const newForm = {
      lastName,
      firstName,
      Email,
      Department,
      Branch,
    };
    onSubmit(newForm);

    // if (
    //   formData.userProfile.Password !== formData.userProfile.confirmPassword
    // ) {
    //   setErrorMessage("Passwords don't match");
    //   return;
    // }

    // const secretKey = 'jWh60R71wb0HN2saj6mD3Rh8BQ4EUf';
    // const encryptedPassword = await aesutils.encrypt(
    //   formData.userProfile.Password,
    //   secretKey,
    // );

    // const newForm = {
    //   ...formData,
    //   userProfile: {
    //     ...formData.userProfile,
    //     Password: encryptedPassword,
    //   },
    // };

    // try {
    //   const response = await fetch(
    //     'https://api-finserve-dev.finserve.africa/user-manager/api/v1/client-signup',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(newForm),
    //     },
    //   );

    //   if (response.ok) {
    //     setSuccessMessage('Form submitted successfully');
    //   } else {
    //     const errorData = await response.json();
    //     setErrorMessage(errorData.message);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   setErrorMessage('An error occurred while submitting the form');
    // }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 p-3">
      <h2>Edit User Details</h2>

      <div className="mb-2 flex flex-col gap-4">
        <button
          className={`flex-1 p-2 ${activeTab === 0 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(0)}
        >
          User Profile
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(1)}
        >
          sender ID
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(2)}
        >
          User Group
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {activeTab === 0 && (
          <div className="flex flex-wrap gap-4">
            {/* First column */}
            <div className="flex w-1/2 flex-col gap-4">
              {/* First row */}
              <div className="flex gap-4">
                {/* Client Name */}
                <input
                  type="text"
                  value={formData.userProfile.firstName}
                  onChange={(e) =>
                    handleInputChange(e, 'userProfile', 'firstName')
                  }
                  placeholder="firstName"
                  className="flex-1 border border-gray-300 p-2"
                  required
                />
                {/* last Name */}
                <input
                  type="text"
                  value={formData.userProfile.lastName}
                  onChange={(e) =>
                    handleInputChange(e, 'userProfile', 'lastName')
                  }
                  placeholder="lastName"
                  className="flex-1 border border-gray-300 p-2"
                  required
                />

                {/* Branch Dropdown */}
                <select
                  value={formData.userProfile.Branch}
                  onChange={(e) =>
                    handleInputChange(e, 'userProfile', 'Branch')
                  }
                  className="flex-1 border border-gray-300 p-2"
                >
                  <option value="">Select Branch</option>
                  {Branches.map((branch) => (
                    <option key={branch.code} value={branch.code}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Second row */}
              <div className="flex gap-4">
                {/* Client Email */}
                <input
                  type="email"
                  value={formData.userProfile.Email}
                  onChange={(e) => handleInputChange(e, 'userProfile', 'Email')}
                  placeholder="Email"
                  className="flex-1 border border-gray-300 p-2"
                />

                {/* password */}
                <input
                  type="password"
                  value={formData.userProfile.Password}
                  onChange={(e) =>
                    handleInputChange(e, 'userProfile', 'Password')
                  }
                  placeholder="Password"
                  className="flex-1 border border-gray-300 p-2"
                />
                <input
                  type="password"
                  value={formData.userProfile.confirmPassword}
                  onChange={(e) =>
                    handleInputChange(e, 'userProfile', 'confirmPassword')
                  }
                  placeholder="Confirm Password"
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="flex flex-col gap-4">
            {/* sender Id */}
            <select
              value={formData.senderID.senderID}
              onChange={(e) => handleInputChange(e, 'senderID', 'senderID')}
              className="border border-gray-300 p-2"
            >
              <option value="">Select Sender ID</option>
              <option>Equity Bank</option>
              <option>Finserve</option>
              <option>Equitel</option>
            </select>
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex flex-col gap-4">
            {/* User Group */}
            <select
              value={formData.userGroup.userGroup}
              onChange={(e) => handleInputChange(e, 'userGroup', 'userGroup')}
              className="border border-gray-300 p-2"
            >
              <option value="">Select User Group</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
        )}
        <div className="flex justify-center px-16">
          {activeTab === 0 && (
            <button
              type="button"
              onClick={() => handleTabChange(1)}
              className="mt-4 flex items-center justify-center gap-1 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              <ArrowRightIcon className="h-5 w-5" /> Next
            </button>
          )}
          {activeTab === 1 && (
            <button
              type="button"
              onClick={() => handleTabChange(2)}
              className="mt-4 flex items-center justify-center gap-1 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              <ArrowRightIcon className="h-5 w-5" /> Next
            </button>
          )}
          {activeTab === 2 && (
            <button
              type="submit"
              className="mt-4 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
