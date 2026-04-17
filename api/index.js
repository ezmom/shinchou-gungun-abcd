const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
};

module.exports = (req, res) => {
  const expectedUser = process.env.BASIC_AUTH_USER || 'aipark';
  const expectedPass = process.env.BASIC_AUTH_PASSWORD || 'shinchou5gatsu';

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zver ABCD Compare"');
    res.statusCode = 401;
    return res.end('Authentication required');
  }
  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const idx = decoded.indexOf(':');
  const u = idx > -1 ? decoded.slice(0, idx) : decoded;
  const p = idx > -1 ? decoded.slice(idx + 1) : '';
  if (u !== expectedUser || p !== expectedPass) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zver ABCD Compare"');
    res.statusCode = 401;
    return res.end('Invalid credentials');
  }

  // 認証成功 → public/配下から静的ファイル返却
  let reqUrl = (req.url || '/').split('?')[0];
  if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(process.cwd(), 'public', safePath);

  if (!filePath.startsWith(path.join(process.cwd(), 'public'))) {
    res.statusCode = 403;
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.end(`Not found: ${safePath}`);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=60');
    res.statusCode = 200;
    res.end(data);
  });
};
