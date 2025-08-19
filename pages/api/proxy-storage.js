export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get filePath from query
  const { filePath } = req.query;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  // Build Supabase Storage URL with proper encoding
  const encodedFilePath = encodeURIComponent(filePath);
  const fileUrl = `https://debescctuqegxpmflerg.supabase.co/storage/v1/object/past-questions/${encodedFilePath}`;

  try {
    // Fetch file from Supabase Storage
    const response = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (!response.ok) {
      console.error(`Supabase storage error: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=60');

    // Copy content headers
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const contentLength = response.headers.get('content-length');
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
    if (contentLength) res.setHeader('Content-Length', contentLength);

    // Stream file
    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch file', details: error.message });
  }
}
