import * as path from 'path';
import express from 'express';

const port = 8080;
const execPath = path.dirname(process.argv[1]);
const publicPath = path.resolve(execPath, '../public');

export async function initServer() {
    const server = express();
    server.use(express.static(publicPath));
    server.listen(port);
    console.log('ENV_LOG:', `http://localhost:${port} --> ${publicPath}`);
}
