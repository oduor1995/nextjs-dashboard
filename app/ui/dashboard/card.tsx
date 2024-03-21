import React from 'react';
import { Send, Users, MessageSquare } from 'react-feather';

export const Dashboardcard = () => {
  const cardStyles = [
    { backgroundColor: '#FFA07A' }, // Light Coral
    { backgroundColor: '#98FB98' }, // Pale Green
    { backgroundColor: '#FFD700' }, // Gold
  ];

  const icons = [<Send />, <Users />, <MessageSquare />];

  return (
    <div className="dashboard">
      {cardStyles.map((style, index) => (
        <div
          key={index}
          className="mx-auto mb-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg"
          style={style}
        >
          <div className="px-4 py-2">
            {icons[index]}
            {index === 0 && (
              <h2 className="mb-2 text-xl font-bold text-gray-800">SMS Sent</h2>
            )}
            {index === 1 && (
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Total Customers
              </h2>
            )}
            {index === 2 && (
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                SMS Campaigns
              </h2>
            )}
            <p className="text-sm text-gray-600">
              {index === 0 && 'View SMS Delivery here.'}
              {index === 1 && 'View All Customers.'}
              {index === 2 && 'View All SMS Campaign.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
