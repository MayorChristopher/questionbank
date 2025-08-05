export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { filePath } = req.query;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  // Read file from request body (as a stream)
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const fileBuffer = Buffer.concat(chunks);

  // Upload to Supabase Storage
  const uploadUrl = `https://debescctuqegxpmflerg.storage.supabase.co/v1/object/past-questions/${filePath}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': req.headers['content-type'] || 'application/octet-stream',
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://mouauqb.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Proxy upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
}
