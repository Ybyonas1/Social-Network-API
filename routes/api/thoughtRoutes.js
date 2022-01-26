const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction } = require('../../controllers/thoughtController');


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
router.route('/:thoughtId/reaction')
    .post(addReaction);

// /api.thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction)



module.exports = router;