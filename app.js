import express from 'express';
import students from './data/students.json'
import _ from 'lodash'

const PORT = 3000;

const buildUrl = (version, path) => `/api/${version}/${path}`
const STUDENTS_BASE_URL = buildUrl('v1', 'students');

const server = express();

server.get('STUDENTS_BASE_URL', (req, res) => {
    res.json(students);
});

server.get(`${STUDENTS_BASE_URL}/:id`, (req, res) => {
    const student = _.find(students, student => student.id == req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.send(`User ${req.params.id} not found`)
    }
});

server.post(STUDENTS_BASE_URL, (req, res) => {
    console.log(req.params.id);
    res.end();
});

server.put(STUDENTS_BASE_URL, (req, res) => {
    console.log("Handling PUT request...");
    res.end();
});

server.delete(STUDENTS_BASE_URL, (req, res) => {
    console.log("Handling DELETE request...");
    res.end();
});


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