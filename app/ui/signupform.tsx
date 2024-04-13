'use client';
// components/Form.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Aesutils from '@/app/lib/encryption';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const aestutils = new Aesutils();

interface ClientDetails {
  clientName: string;
  country: string;
  clientEmail: string;
  clientPhone: string;
  physicalAddress: string;
  postalAddress: string;
  postalCode: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
}

interface Document {
  base64ImageData: string;
  documentType: string;
  mimetype: string;
  documentName: string;
}

interface FormData {
  clientDetails: ClientDetails;
  userInfo: UserInfo;
  documents: Document[];
}

const Form = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    clientDetails: {
      clientName: '',
      country: 'KE',
      clientEmail: '',
      clientPhone: '',
      physicalAddress: '',
      postalAddress: '',
      postalCode: '',
    },
    userInfo: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
    },
    documents: [
      {
        base64ImageData: '',
        documentType: '',
        mimetype: '',
        documentName: '',
      },
    ],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: keyof FormData,
    field: string,
  ) => {
    const newFormData = { ...formData };
    (newFormData[category] as any)[field] = e.target.value;
    setFormData(newFormData);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const filePromises = files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          base64ImageData: base64 as string,
          documentType: 'termsAndConditions', // Assuming fixed documentType, adjust as necessary
          mimetype: file.type,
          documentName: file.name,
        };
      });

      const documents = await Promise.all(filePromises);

      setFormData({
        ...formData,
        documents: [...formData.documents, ...documents],
      });
    }
  };

  const convertToBase64 = (
    file: File,
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Encrypt the form data
    const secretKey = 'jWh60R71wb0HN2saj6mD3Rh8BQ4EUf';
    const encryptedPassword = await aestutils.encrypt(
      formData.userInfo.password,
      secretKey,
    );
    console.log(formData.userInfo.password);
    const newForm = {
      ...formData,
      userInfo: {
        ...formData.userInfo,
        password: encryptedPassword,
      },
    };
    setFormData(newForm);
    console.log(newForm);
    console.log('Encrypted Data:', formData);
    console.log(encryptedPassword);

    try {
      const response = await fetch(
        'https://api-finserve-dev.finserve.africa/user-manager/api/v1/client-signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newForm),
        },
      );

      if (response.ok) {
        console.log('Form submitted successfully');
        window.location.href = '/login';
        // Handle success behavior here, like redirecting or showing a success message
      } else {
        const data = response.json;
        setErrorMessage(data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error behavior here
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg border border-gray-300 p-3">
      <h2 className="bg-white-500 mb-4 flex justify-center rounded-lg p-2 text-xl font-semibold text-white">
        <img
          src="https://www.finserve.africa/images/finserve-big-logo.svg"
          alt="Finserve Logo"
          className="h-15 w-15 mr-2"
        />
        Sign up Form
      </h2>

      <div className="mb-2 flex">
        <button
          className={`flex-1 p-2 ${activeTab === 0 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(0)}
        >
          Client Details
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(1)}
        >
          User Info
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange(2)}
        >
          Documents
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {activeTab === 0 && (
          <div className="flex flex-wrap gap-4">
            {/* First column */}
            <div className="flex w-1/2 flex-col gap-4">
              {/* First row */}
              <div className="flex gap-4">
                {/* Client Name */}
                <input
                  type="text"
                  value={formData.clientDetails.clientName}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'clientName')
                  }
                  placeholder="Client Name"
                  className="flex-1 border border-gray-300 p-2"
                />

                {/* Country */}
                <input
                  type="text"
                  value={formData.clientDetails.country}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'country')
                  }
                  placeholder="Country"
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>

              {/* Second row */}
              <div className="flex gap-4">
                {/* Client Email */}
                <input
                  type="email"
                  value={formData.clientDetails.clientEmail}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'clientEmail')
                  }
                  placeholder="Client Email"
                  className="flex-1 border border-gray-300 p-2"
                />

                {/* Client Phone */}
                <input
                  type="tel"
                  value={formData.clientDetails.clientPhone}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'clientPhone')
                  }
                  placeholder="Client Phone"
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>
            </div>

            {/* Second column */}
            <div className="flex w-1/2 flex-col gap-4">
              {/* Third row */}
              <div className="flex gap-4">
                {/* Physical Address */}
                <input
                  type="text"
                  value={formData.clientDetails.physicalAddress}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'physicalAddress')
                  }
                  placeholder="Physical Address"
                  className="flex-1 border border-gray-300 p-2"
                />

                {/* Postal Address */}
                <input
                  type="text"
                  value={formData.clientDetails.postalAddress}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'postalAddress')
                  }
                  placeholder="Postal Address"
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>

              {/* Fourth row */}
              <div className="flex gap-4">
                {/* Postal Code */}
                <input
                  type="text"
                  value={formData.clientDetails.postalCode}
                  onChange={(e) =>
                    handleInputChange(e, 'clientDetails', 'postalCode')
                  }
                  placeholder="Postal Code"
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="flex flex-col gap-4">
            {/* First Name */}
            <input
              type="text"
              value={formData.userInfo.firstName}
              onChange={(e) => handleInputChange(e, 'userInfo', 'firstName')}
              placeholder="First Name"
              className="border border-gray-300 p-2"
            />

            {/* Last Name */}
            <input
              type="text"
              value={formData.userInfo.lastName}
              onChange={(e) => handleInputChange(e, 'userInfo', 'lastName')}
              placeholder="Last Name"
              className="border border-gray-300 p-2"
            />

            {/* Email Address */}
            <input
              type="email"
              value={formData.userInfo.emailAddress}
              onChange={(e) => handleInputChange(e, 'userInfo', 'emailAddress')}
              placeholder="Email Address"
              className="border border-gray-300 p-2"
            />

            {/* Phone Number */}
            <input
              type="tel"
              value={formData.userInfo.phoneNumber}
              onChange={(e) => handleInputChange(e, 'userInfo', 'phoneNumber')}
              placeholder="Phone Number"
              className="border border-gray-300 p-2"
            />

            {/* Password */}
            <input
              type="password"
              value={formData.userInfo.password}
              onChange={(e) => handleInputChange(e, 'userInfo', 'password')}
              placeholder="Password"
              className="border border-gray-300 p-2"
            />
          </div>
        )}

        {activeTab === 2 && (
          <div>
            {/* Documents Form Fields */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2"
              multiple
            />
            {/* You might want to add additional functionality for multiple documents */}
          </div>
        )}

        <button type="submit" className="bg-red-500 p-2 text-white">
          Submit
        </button>
        {/* Link to the login page */}
        <div className="mb-4 text-center">
          <Link href="/login">
            <a className="text-blue-500 hover:underline">
              Already have an account? Login here.
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
