const router = require('express').Router();
const thought = require('../../models/thought')

router.get('/', (req, res) => {
    thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
})

router.get('/:')

module.exports = router
