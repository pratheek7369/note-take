const fetch = global.fetch || require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const upstream = process.env.LOGIN_API_URL || 'https://apis.ccbp.in/login';

  // Obtain raw body if available, otherwise stringify parsed body
  let body;
  if (req.body && Object.keys(req.body).length) {
    body = JSON.stringify(req.body);
  } else {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => { resolve(data); });
    });
  }

  try {
    const upstreamRes = await fetch(upstream, {
      method: 'POST',
      headers: { 'content-type': req.headers['content-type'] || 'application/json' },
      body
    });

    const text = await upstreamRes.text();
    res.status(upstreamRes.status);
    const contentType = upstreamRes.headers.get('content-type') || 'application/json';
    res.setHeader('content-type', contentType);
    res.send(text);
  } catch (err) {
    res.status(502).json({ error: 'Bad Gateway', message: err.message });
  }
};
