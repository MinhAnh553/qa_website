import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'express-flash';
import cors from 'cors';

import * as database from './config/database.js';
import path from 'path';
import bodyParser from 'body-parser';

import { clientRoute } from './routes/client/indexRoute.js';

// env
dotenv.config();

// App, port
const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Config view
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

// Config static file
app.use(express.static(path.join(process.cwd(), 'public')));

// Cấu hình session
app.use(
    session({
        secret: 'minhanh55',
        resave: false,
        saveUninitialized: true,
    }),
);

// Kích hoạt express-flash
app.use(flash());

// cors
app.use(cors());

// Database
database.connect();

// Route
app.use(clientRoute);

app.listen(port, () => {
    console.log(`Project back-end running at http://localhost:${port}...`);
});
