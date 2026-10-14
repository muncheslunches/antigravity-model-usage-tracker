import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getLiveQuota() {
  return new Promise((resolve) => {
    const lsAddress = process.env.ANTIGRAVITY_LS_ADDRESS || 'localhost:5387';
    const token = process.env.ANTIGRAVITY_CSRF_TOKEN || '';
    const [host, port] = lsAddress.split(':');

    const req = http.request({
      host,
      port,
      path: '/exa.language_server_pb.LanguageServerService/GetUserStatus',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-codeium-csrf-token': token
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    });

    req.on('error', (err) => resolve({ error: err.message }));
    req.write('{}');
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/quota') {
    const data = await getLiveQuota();
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(data));
    return;
  }

  // Serve Dashboard HTML
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  const htmlPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.end(fs.readFileSync(htmlPath));
  } else {
    res.end('<h1>Model Quota Tracker</h1>');
  }
});

const PORT = process.env.PORT || 0;
server.listen(PORT, '127.0.0.1', () => {
  const addr = server.address();
  console.log(`[sidecar:quota-panel] listening on http://127.0.0.1:${addr.port}`);
});
