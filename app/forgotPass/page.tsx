'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import AccessToken from 'twilio/lib/jwt/AccessToken';

interface ForgotPasswordProps {
  devUrl: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ devUrl }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const authToken = localStorage.getItem('accessToken');
    e.preventDefault();

    try {
      const response = await fetch(
        'https://api-finserve-dev.finserve.africa/user-manager/api/v1/client-user/password/reset-link',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        setMessage('Password reset link sent successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed to send password reset link.');
      }
    } catch (error) {
      console.error('Error sending password reset link:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg border border-gray-300 p-3 ">
      <h2 className="bg-white-500 mb-4 flex justify-center rounded-lg p-2 text-xl font-semibold text-white">
        <img
          src="https://www.finserve.africa/images/finserve-big-logo.svg"
          alt="Finserve Logo"
          className="h-15 w-15 mr-2"
        />
        Sign up Form
      </h2>
      <h1 className="mx-auto mb-4 text-center font-bold">Bulk-sms</h1>
      <h2 className="flex justify-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3 ">
        <div className="flex justify-center">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleChange} required />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
