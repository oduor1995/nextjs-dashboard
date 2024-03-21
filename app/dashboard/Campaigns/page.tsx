'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import handler, { sendMessage } from '../../services/send-mesage';

const SmsCampaign: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!recipient || !message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('recipient', recipient);
      formData.append('message', message);

      if (csvFile) {
        formData.append('csvFile', csvFile);
      }

      const response = await sendMessage(formData);

      console.log({ response });

      if (response.ok) {
        alert('SMS sent successfully!');
        setRecipient('');
        setMessage('');
        setCsvFile(null); // Clear the file input
      } else {
        const errorData = await response.json();
        alert(`Failed to send SMS: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setCsvFile(files[0]);
    }
  };

  return (
    <div>
      <Head>
        <title>SMS Campaign</title>
      </Head>

      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data" // Required for file uploads
        className="mx-auto mt-8 max-w-md rounded border p-4"
      >
        <h1 className="mb-4 text-2xl font-bold">Send SMS Campaign</h1>

        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-600"
          >
            Recipient Number:
          </label>
          <input
            type="tel"
            id="recipient"
            name="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient number"
            className="mt-1 w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your SMS message"
            rows={4}
            className="mt-1 w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="csvFile"
            className="block text-sm font-medium text-gray-600"
          >
            Upload CSV File:
          </label>
          <input
            type="file"
            id="csvFile"
            name="csvFile"
            onChange={handleFileChange}
            className="mt-1 w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="focus:shadow-outline-blue rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
        >
          Send SMS
        </button>
      </form>
    </div>
  );
};

export default SmsCampaign;
