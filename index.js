import { handler } from './build/handler.js';
import injectSocketIO from './socketIoHandler.js'
import express from 'express'; 
import http from 'http';
 
const app = express();
const server = http.createServer(app);
 
// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', async (req, res) => {
  res.end('ok');
});

injectSocketIO(server);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler); 
 
server.listen(3000, () => {
  console.log('listening on port 3000');
});