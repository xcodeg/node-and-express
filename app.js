import express from 'express';
import morgan from 'morgan';
import StudentRoute from './routes/StudentRoute';
import students from './data/students.json';
import _ from 'lodash';
import bodyParser from 'body-parser';

const PORT = 3000;

const buildUrl = (version, path) => `/api/${version}/${path}`
const STUDENTS_BASE_URL = buildUrl('v1', 'students');

const server = express();

server.use(morgan('tiny'));
server.use(bodyParser.json());

server.use(STUDENTS_BASE_URL, StudentRoute)

server.get('/route-handlers', (req, res, next) => {
    res.send("learning route handlers is cool");
    next();
}, (req, res, next) => {
    console.log("Second handler");
    next();
}, (req, res) => {
    console.log("Third handler");
});

server.listen(3000, () => {
    console.log(`server started on port ${PORT}`);
}); 