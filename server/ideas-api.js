const express = require('express');
const router = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

router.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.status(200).send(ideas);
});

router.get('/:ideaId', (req, res, send) => {
    const id = req.params.ideaId;
    if (db.getFromDatabaseById("ideas", id) == null) {
        res.status(404).send('Not found')
    } else {
        res.send(db.getFromDatabaseById("ideas", id))
    };
});

router.post('/',checkMillionDollarIdea ,(req, res, next) => {
    const newIdea = req.body;
    if (typeof newIdea.name !== 'string' || typeof newIdea.description !== 'string') {
        res.status(404).send('bad request');
    } else {
        res.status(201).send(db.addToDatabase('ideas', req.body));
    };
});

router.put('/:ideaId',checkMillionDollarIdea ,(req, res, next) => {
    const id = req.params.ideaId;
    const updatedIdea = req.body;
    updatedIdea.id = id;
    if (db.getFromDatabaseById("ideas", id) == null) {
        res.status(404).send('Not found');
    } else {
        updatedIdea.id = id;
        try {
            res.send(db.updateInstanceInDatabase('ideas', updatedIdea));
        } catch (err) {
            next(err)
        };
    };
});

router.delete('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    
    if (db.deleteFromDatabasebyId('ideas', id) !== true) {
        res.status(404).send("Not found");
    } else {
        res.status(204).send("Deleted");
    };
});


module.exports = router;