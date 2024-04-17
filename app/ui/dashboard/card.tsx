'use client';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
