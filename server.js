import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
const root = process.cwd();
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };
createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = normalize(join(root, relative));
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) return response.writeHead(404).end("Não encontrado");
  const type = types[extname(file)] || "application/octet-stream";
  response.writeHead(200, { "Content-Type": type.startsWith("image/") ? type : `${type}; charset=utf-8` });
  createReadStream(file).pipe(response);
}).listen(8084, "127.0.0.1", () => console.log("Cícero disponível em http://127.0.0.1:8084/"));
