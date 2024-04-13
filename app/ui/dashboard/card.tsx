'use client';
import React from 'react';
import { Send, Users, MessageSquare } from 'react-feather';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DashboardCard = () => {
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
          key={index} // Add key prop here
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

interface CardProps {
  image: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export function ActionAreaCard({
  image,
  title,
  description,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <Card sx={{ maxWidth: 345, height: 140, backgroundColor: bgColor }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          className="max-h-full max-w-full"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: textColor, flexGrow: 1, overflow: 'auto' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: textColor }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
