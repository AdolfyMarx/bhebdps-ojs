import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import {
  extname, normalize, resolve, sep
} from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT) || 9001;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = requestUrl.pathname === '/'
    ? 'index.html'
    : decodeURIComponent(requestUrl.pathname.slice(1));
  const filePath = resolve(distDirectory, normalize(requestedPath));
  const isInsideDist = filePath.startsWith(`${distDirectory}${sep}`);

  if (!isInsideDist) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStats = await stat(filePath);

    if (!fileStats.isFile()) {
      throw new Error('Requested path is not a file');
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream'
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`RPG-game: http://127.0.0.1:${port}\n`);
});
