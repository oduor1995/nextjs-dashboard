import { useState, FormEvent } from 'react';
import Head from 'next/head';

const SmsCampaign: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!recipient || !message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient,
          message,
        }),
      });

      if (response.ok) {
        alert('SMS sent successfully!');
        setRecipient('');
        setMessage('');
      } else {
        alert('Failed to send SMS. Please try again.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Head>
        <title>SMS Campaign</title>
      </Head>

      <form
        onSubmit={handleFormSubmit}
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
