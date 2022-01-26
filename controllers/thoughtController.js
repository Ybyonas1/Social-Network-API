const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            // .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //POST to create a new thought 

    //** (don't forget to push the created thought's _id to the associated user's thoughts array field) **
    createThoughts(req, res) {
        Thought.create(req.body)
            .then(thought => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })

            .then(() => res.json({ message: 'Thought added!' }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            // .then((thought) =>
            //     !thought
            //         ? res.status(404).json({ message: 'No thought with that ID' })
            //         // I THINK =>  : Student.deleteMany({ _id: { $in: user.thoughts } })
            //         : User.deleteMany({ _id: { what goes in here ? } })
            // )
            .then(() => res.json({ message: 'thought has been deleted by _id!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Create a thought by its _id
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction by the reactions Id
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};