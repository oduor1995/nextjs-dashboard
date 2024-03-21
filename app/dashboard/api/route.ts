// pages/api/upload.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { group_name } = req.body;

      // You can process group_name or perform additional business logic here

      // Forward the file to the Express server
      const expressResponse = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: JSON.stringify({ group_name }), // Send only the group_name to the Express server
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const expressData = await expressResponse.json();

      // Process the combined response (business logic + file upload)
      res.json({ message: 'File uploaded successfully', ...expressData });
    } catch (error) {
      console.error('Error in Next.js API route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

  
