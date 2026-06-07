import { createServer } from 'http';
import handler from './api/quran.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const server = createServer(async (req, res) => {
  if (req.url === '/api/quran' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const webReq = new Request(`http://localhost${req.url}`, {
          method: req.method,
          headers: new Headers(req.headers),
          body: body
        });
        
        const webRes = await handler(webReq);
        
        const headers = {};
        webRes.headers.forEach((val, key) => headers[key] = val);
        
        res.writeHead(webRes.status, headers);
        const out = await webRes.text();
        res.end(out);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: true, message: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Local API running on port 3001 for Vite proxy');
});
