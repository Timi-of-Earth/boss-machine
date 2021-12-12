const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});

router.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    if (typeof newMeeting.time !== 'string' || !newMeeting.date instanceof Date || typeof newMeeting.day !== 'string' || typeof newMeeting.note !== 'string') {
        res.status(404).send('bad request');
    } else {
        db.addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    };
});

router.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings')
    res.status(204).send();
})




module.exports = router;