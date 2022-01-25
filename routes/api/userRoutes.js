const router = require('express').Router();
const { 
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateSingleUser)
.delete(deleteUser);

// /api/users/:userId/friends

// /api/user/:userId/friends/:friendId
router.route('/:user/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;