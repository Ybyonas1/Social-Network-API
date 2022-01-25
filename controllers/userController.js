const { Thought, User } = require('../models');

module.exports = {
    //Get all Users
    getUsers(req, res) {
        User.find()
            .then((Users) => res.json(Users))
            .catch((err) => res.status(500).json(err));
    },

    //Get a single user by _id & populated thought and friend.
    getSingleUser(req, res) {
        User.findById({ _id: req.params.userId })
            // IS THIS RIGHT??
            // .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Update a user by its _id
    updateSingleUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            // Do I need these? What do they do?
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    // Delete user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    // BONUS: Remove a user's associated thoughts when deleted.
                    : Thought.deleteMany({ username: user.username })
            )
            .then(() => res.json({ message: 'user and users thoughts? deleted!' }))
            .catch((err) => res.status(500).json(err));
    },


    // Add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            // Do I need these? What do they do?
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID :(' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove a friend from a users friend list
    removeFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            // Do I need these? What do they do?
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID :(' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};