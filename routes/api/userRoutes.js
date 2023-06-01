const router = require('express').Router();
const User = require('../../models/user')

router.get('/', (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
})

router.get('/:userID', (req, res) => {
    User.findOne({ _id: req.params.userID })
    .select('-__v')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
})

router.post('/', (req, res) => {
    User.create(req.body)         
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));        
})

router.put('/:userID', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userID },
        { username: req.body.username }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err)); 
})

router.delete('/:userID', (req, res) => {
    User.findOneAndDelete({_id: req.params.userID})
    .then(() => res.json({ message: 'User and associated apps deleted!' }))
    .catch((err) => res.status(500).json(err));
})

// Add friend
router.post('/:userID/friends/:friendID', (req, res) => {    
    const userID = req.params.userID;
    const friendID = req.params.friendID;

    const updateFriendPromise = User.findOneAndUpdate(
        { _id: friendID },
        { $push: { friends: userID } }
    ).exec();

    const updateUserPromise = User.findOneAndUpdate(
        { _id: userID },
        { $push: { friends: friendID } }
    ).exec();

    Promise.all([updateFriendPromise, updateUserPromise])
        .then(([updatedFriend, updatedUser]) => {
            res.json({ updatedFriend, updatedUser });
        })
        .catch((err) => res.status(500).json(err));
})

module.exports = router