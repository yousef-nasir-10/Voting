const express = require('express')
const router = express.Router()

const {
    getAllVotes,
    createVotes,
    addVote,
    myVotes,
    toVoted,
    getVoteById,
    searchVotes,

  
} = require('../controllers/vote') 

router.route('/').get(getAllVotes).post(createVotes)
router.route('/search').get(searchVotes)
router.route('/:id').get(getVoteById)
router.route('/createdBy/:username').get(myVotes)
router.route('/ivoted/:username').get(toVoted)
router.route('/addVote').patch(addVote)
router.route('/addVote/:id').patch(addVote)


module.exports = router 