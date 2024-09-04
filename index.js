import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { clientRoute } from './routes/client/indexRoute.js';

// env
dotenv.config();

// App, port
const app = express();
const port = process.env.PORT;

// Config view
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

// Config static file
app.use(express.static(path.join(process.cwd(), 'public')));

// Route
app.use(clientRoute);

app.listen(port, () => {
    console.log(`Project back-end running at http://localhost:${port}...`);
});
