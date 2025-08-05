export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get filePath from query
  const { filePath } = req.query;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  // Build Supabase Storage URL
  const fileUrl = `https://debescctuqegxpmflerg.storage.supabase.co/v1/object/past-questions/${filePath}`;

  try {
    // Fetch file from Supabase Storage
    const response = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://mouauqb.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=60');

    // Copy content headers
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    // Stream file
    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch file', details: error.message });
  }
}
