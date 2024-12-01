import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'express-flash';
import cors from 'cors';
import moment from 'moment';
import methodOverride from 'method-override';

import 'moment-timezone';
import 'moment/locale/vi.js';

import * as database from './config/database.js';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { clientRoute } from './routes/client/indexRoute.js';
import { adminRoute } from './routes/admin/indexRoute.js';
import system from './config/system.js';

// env
dotenv.config();

// App, port
const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// override method
app.use(methodOverride('_method'));

// Use Cookie
app.use(cookieParser());

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

// Biến
moment.locale('vi');
app.locals.moment = moment;
app.locals.prefixAdmin = system.prefixAdmin;

/* New Route to the TinyMCE Node module */
app.use(
    '/tinymce',
    express.static(
        path.join(path.join(process.cwd()), 'node_modules', 'tinymce'),
    ),
);

// Route
app.use(clientRoute);
app.use(adminRoute);

// Socket
const server = createServer(app);
const io = new Server(server);
global._io = io;

app.get('*', (req, res) => {
    res.render('client/pages/error/404.pug');
});

server.listen(port, () => {
    console.log(`Project back-end running at http://localhost:${port}...`);
});
