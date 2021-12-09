const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.status(200).send(minions);
});

router.get('/:minionId', (req, res, send) => {
    const id = req.params.minionId;
    if (db.getFromDatabaseById("minions", id) == null) {
        res.status(404).send('Not found')
    } else {
        res.send(db.getFromDatabaseById("minions", id))
    };
})

router.post('/', (req, res, next) => {
    const newMinion = req.body;
    if (typeof newMinion.name !== 'string' || typeof newMinion.title !== 'string' || typeof newMinion.weaknesses !== 'string') {
        res.status(404).send('bad request');
    } else {
        res.status(201).send(db.addToDatabase('minions', req.body));
    };
});

router.put('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const updatedMinion = req.body;
    updatedMinion.id = id;
    if (db.getFromDatabaseById("minions", id) == null) {
        res.status(404).send('Not found');
    } else {
        updatedMinion.id = id;
        try {
            res.send(db.updateInstanceInDatabase('minions', updatedMinion));
        } catch (err) {
            next(err)
        };
    };
});

router.delete('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    
    if (db.deleteFromDatabasebyId('minions', id) !== true) {
        res.status(404).send("Not found");
    } else {
        res.status(204).send('Deleted');
    };
});


module.exports = router;