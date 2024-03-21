// app/api/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';




export  const sendMessage = (data: {message: string, recipient: string})=> {
 console.log('sendMessage')
 fetch("http://localhost:5000", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
 }).then(res => res.json())
}