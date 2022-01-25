const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
    updateThought,
    deleteThought,
    addReation,
    removeReation } = require('../../controllers/thoughtController');


// /api/thoughts
    router.route('/')
    .get(getThoughts)
    .post(createThoughts);


// /api/thoughts/:thoughtid
    router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/:thoughtId/reaction
router.route('/thoughts/:thoughtId/reaction')
.post(addReation);

// /api.thoughts/:thoughtId/reaction/:reactionId
router.route('./thoughts/:thoughtsId/reaction/:reactionId')
.delete(removeReation)



module.exports = router;