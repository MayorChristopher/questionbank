export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    return res.status(200).end();
  }

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

  // Upload to Supabase Storage using PUT method
  const uploadUrl = `https://debescctuqegxpmflerg.supabase.co/storage/v1/object/past-questions/${encodeURIComponent(filePath)}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': req.headers['content-type'] || 'application/pdf',
        'x-upsert': 'false'
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase upload error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    const result = await response.json();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Proxy upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
}
