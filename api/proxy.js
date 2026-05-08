export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'No API key found' });
  }

  return res.status(200).json({ 
    keyFound: true, 
    keyPrefix: apiKey.substring(0, 15),
    keyLength: apiKey.length 
  });
}
