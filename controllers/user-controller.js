const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add friend to user's friend list
    addFriend({ params }, res) {
        if (params.friendId) {
            User.findOneAndUpdate(
                {_id : params.userId}, 
                {$push: {friends : params.friendId}}, 
                {new : true}
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No Friend with that Id'});
                  }
              res.json(dbUserData);
            })
            .catch(err=> {
              res.json(err);
            })
        }
        else {
            return res.status(500).json({ message: 'Not a valid Id'});
        }
    },

    // Delete friend from user's friend list
    deleteFriend({ params }, res) {
        if (params.friendId) {
            User.findOneAndUpdate(
                { _id : params.userId}, 
                { $pull : { friends : params.friendId  } }, 
                { runValidators: true, new: true}
                )
                  .then(dbUserData => {
                    if (!dbUserData) {
                      return res.status(404).json({ message: 'No Friend with that Id'});
                    }
                res.json(dbUserData);
              })
              .catch(err=> {
                res.json(err);
              })
        }
        else {
            return res.status(500).json({ message: 'Not a valid Id'});
        }
    }
};

module.exports = userController;