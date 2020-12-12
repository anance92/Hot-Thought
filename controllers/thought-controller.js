const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Create reaction to a single thought
    createReaction({ params }, res) {
        Thought.findOneAndUpdate({_id : params.thoughtId}, {$push: {reactions : body}}, {new : true})
        .then(dbThoughtData => {
          res.json(dbThoughtData);
        })
        .catch(err=> {
          res.json(err);
        })
    },

    // Delete reaction from a single thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id : params.thoughtId}, 
            { $pull : { reactions } }, 
            { runValidators: true, new: true}
            )
              .then(dbThoughtData => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: 'No Reaction to delete'});
                }
            res.json(dbThoughtData);
          })
          .catch(err=> {
            res.json(err);
          })
    }
};

module.exports = thoughtController;