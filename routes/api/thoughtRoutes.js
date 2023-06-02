const router = require('express').Router();
const Thought = require('../../models/thought')
const User = require('../../models/user')
const Reaction = require('../../models/reaction')
const mongoose = require('mongoose');
const thought = require('../../models/thought');

// finds all thoughts
router.get('/', (req, res) => {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
})

// find thought by ID
router.get('/:thoughtID', (req, res) => {
    Thought.findOne({ _id: req.params.thoughtID })
    .select('-__v')
    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
})

// create thought
router.post('/', (req, res) => {
    Thought.create(req.body)
      .then((thought) => {
        const thoughtId = thought._id;
  
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        res.json(user); // Send the updated user document as the response
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something went wrong' });
      });
  });

// update thought
router.put('/:thoughtID', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { thoughtText: req.body.thoughtText },
        { username: req.body.username}
    )
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err)); 
})

// Delete thought
router.delete('/:thoughtID', (req, res) => {
    Thought.findOneAndDelete({_id: req.params.thoughtID})
    .then(() => res.json({ message: 'thought deleted!' }))
    .catch((err) => res.status(500).json(err));
})

// Add reaction
router.post('/:thoughtID/reactions', (req, res) => {
  const thoughtID = req.params.thoughtID;
  const reactionData = req.body;
  const reaction = new Reaction(reactionData);

  Thought.findByIdAndUpdate(
    thoughtID,
    { $push: { reactions: reaction } },
    { new: true }
  )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    })
    .catch((err) => res.status(500).json(err));
})

// Remove reaction
router.delete('/:thoughtID/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtID, reactionId } = req.params;
    const post = await Thought.findById(thoughtID);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    let index = -1
    for (let i=0; i < post.reactions.length; i++) {
      if (post.reactions[i].reactionId == reactionId) {
        index = i
        break
      }
    }
    if (index != -1 ) {
      post.reactions.splice(index, 1)
      await post.save()
      res.json({ message: 'Reaction deleted' });
    }
  } catch (error) {
    console.error('Error deleting reaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router