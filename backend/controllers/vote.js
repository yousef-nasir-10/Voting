const  mongoose  = require('mongoose')
const Vote = require('../models/vote')

const getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.find({})
        res.status(200).json({votes})
        //res.status(200).json({votes, amount:votes.length})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getVoteById = async(req, res) =>{
    try { 
        const{id:voteId} = req.params
        console.log(voteId);
       
        const vote = await Vote.findOne({_id: voteId})
        if(!vote){
            return res.status(404).json({msg: `No voting with id : ${voteId}}`})

        }
        res.status(200).json({vote})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
} 

const createVotes = async(req, res) =>{
    try {
        const vote = await Vote.create(req.body)
        res.status(200).json({vote})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    } 
    
}
const addVote = async(req, res) =>{

    try {
        let vote = await Vote.findOne({_id: req.body.id})
        if(!vote){
            return res.status(404).json({msg: `No project with id : ${req.body.id}}`})

        }
        let singleCandidate = vote.candidates.find(candidate => candidate.desc === req.body.voting)
        
        singleCandidate.voter.push(req.body.username)
        await Vote.findOneAndUpdate({_id : req.body.id}, vote)
        res.status(200).json({vote})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const myVotes = async(req, res) =>{
    const{username:userName} = req.params

    try {

        let vote = await Vote.find({created_by: userName})
        if(!vote){
            return res.status(404).json({msg: `No project with id : ${req.body.id}}`})

        }
        res.status(200).json({vote})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const toVoted = async(req, res) =>{
    const{username:userName} = req.params
    console.log(userName);

    try {

        let votes = await Vote.find({})
        if(!votes){
            return res.status(404).json({msg: `No project with id : ${req.body.id}}`})

        }
        let b = []
        let voti = []
        let votedTo = []

        let a  = votes.filter(vote => {
            vote.candidates.filter( candidate => {
                voti = candidate.voter.filter(votr => votr.includes(userName))
            })
            b.push(voti) 
        })

        let d = b.map((bb, i) => {
            return bb.length > 0? true : false
        });

        d.map((dd, i) => {
            return dd === true? votedTo.push(votes[i]) : null

        })
        
        res.status(200).json({votedTo})

    } catch (error) {
        res.status(500).json({msg: error})
        console.log(error);
    } 

}

const searchVotes = async (req, res) => {
    let votes = 'const'
    // 1. Find based on whatever passed in the query //
    votes = await Vote.find(req.query)

    // 2. Find based on chosen parmaters //
    const {_id, title, sort, fields} = req.query // the allowed set of parameters 
    const queryObject = {} // object that conatins all properties have been used initially no query is used

    // 2.1 find by company if comapny property exist 


    // 2.2 find by company if company property exist 
    if(_id){
        queryObject._id = _id  
    }

    // 2.3 find by name if name property exist 
    if(title){
        queryObject.title = {$regex: title, $options: 'i'} // regex: to check if search value within a string
    }


    console.log(queryObject);
    let result = Vote.find(queryObject)
    // 2.4 sort based on the cratirea user went with. if no, then by defult sort based on creation date. 
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        
       
    }else{
        result = result.sort('createdAt')
    }
    // 2.5 fields chosen to be shown or displayed. 
    if(fields){
        fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
    result = result.skip(skip).limit(limit)
    votes = await result

    res.status(200).json({ votes, nbHits: votes.length })


}












module.exports = {
    getAllVotes,
    getVoteById,
    createVotes,
    addVote,
    myVotes,
    toVoted,
    searchVotes

}