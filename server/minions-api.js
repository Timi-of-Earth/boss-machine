const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.status(200).send(minions);
});

router.post('/', (req, res, next) => {
    const newMinion = req.body;
    if (typeof newMinion.name !== 'string' || typeof newMinion.title !== 'string' || typeof newMinion.weaknesses !== 'string' || !newMinion.salary) {
        res.status(404).send('bad request');
    } else {
        res.send(db.addToDatabase('minions', req.body));
    };
});


module.exports = router;