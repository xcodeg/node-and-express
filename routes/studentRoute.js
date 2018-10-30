import express from 'express';
import _ from 'lodash';
import students from '../data/students.json';


const router = express.Router();

let studentsArray = students;

router.get('/', (req, res) => {
    res.json(studentsArray);
});

router.get('/:id', (req, res) => {
    const student = _.find(studentsArray, student => student.id === req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.send(`User ${req.params.id} not found`)
    }
});

router.post('/', (req, res) => {
    console.log("handling POST request...");
    console.log(req.body);
    //console.log(req.params.id);
    // we could do some validation
    studentsArray.push(req.body);
    res.status(200).send("OK");
});

router.put('/', (req, res) => {
    console.log("Handling PUT request...");
    res.end();
});

router.delete('/', (req, res) => {
    console.log("Handling DELETE request...");
    res.end();
});

router.param('id', (req, res, next, id) => {
    if (isNaN(id)) {
        next(`Id ${id} is not a number`);
    } else 
    next();
});

module.exports = router;