import React, { useEffect, useState } from 'react'
import { PATCH, username } from '../API'
import Alert from './Alert';

function Vote({ created_by, title, _id, candidates, toogleVote }) {
    const [isSentVote, setIsSentVote] = useState(false)
    const [voting, setVoting] = useState(0)
    const [votersArr, setVotersArr] = useState([])
    const [candidateArrayNum, setCandidateArrayNum] = useState([])
    const [candidateVoted, setCandidateVoted] = useState("")
    const [totalVoting, setTotalVoting] = useState(0)
    console.log(username);


    useEffect(() => {
        try {

            let m = []
            let c = []
            let allVotes = []
            let allVotes1 = 0
            let v = 0
            for (let i = 0; i < candidates.length; i++) {

                console.log(candidates[i], i);

                allVotes.push(candidates[i].voter)


            }
            console.log(allVotes);
            allVotes.forEach((ele, i) => {
                console.log(ele.length);
                allVotes1 = allVotes1 + ele.length
                c.push(ele.length)
            })
            setTotalVoting(allVotes1)

            let k = []
            c.forEach(num => {
                console.log(num, totalVoting, c);
                k.push((num / allVotes1) * 100)
            })
            console.log(k, allVotes1);
            setCandidateArrayNum(k)



            let a = candidates.find(candidate => {
                m.push(candidate.voter)
                return candidate.voter.includes(username)

            })
            console.log(m);
            setCandidateVoted(a._id)
            setVotersArr(m.flat())


        } catch (error) {

        }

    }, [voting, isSentVote])

    return (
        <li key={_id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow" onClick={() => {
            console.log(_id);
            toogleVote

        }}>
            <div className='mt-2 absolute top-10 right-2 animate-bounce'>
                {isSentVote && <Alert />}

            </div>
            <div className="flex w-full items-center justify-between space-x-6 p-2">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3 divide-gray-200 border-b p-2">
                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 p-1 px-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            created by
                        </span>
                        <h3 className="truncate text-sm font-medium text-gray-900">@{created_by}</h3>
                    </div>
                    <p className=" truncate text-sm text-gray-500 font-bold mt-4 p-6">{title}</p>
                </div>
            </div>
            <div>
                <div className={`-mt-px flex divide-x divide-gray-200  `}>
                    {candidates.map((candidate, i) => (
                        <div
                            className={`flex w-0  cursor-pointer flex-1 ${candidateVoted === candidate._id ? "bg-indigo-600 " : ""} `}
                            onClick={() => {


                                // let a =  candidates.find(candidate => {
                                //     m.push(candidate.voter)
                                //     return candidate.voter.includes(username)

                                // })
                                // console.log(a);
                                console.log(votersArr);





                                if (votersArr.includes(username)) {
                                    alert("You have already voted")
                                } else if(username) {
                                    PATCH("votes/addVote", {
                                        id: _id,
                                        username: username,
                                        voting: candidate.desc
                                    }).then(response => {
                                        console.log(response);
                                        setVoting(prevSate => prevSate + 1)
                                        if (response.status === 200) {
                                            setIsSentVote(true)

                                            setTimeout(() => {
                                                setIsSentVote(false)
                                            }, 3000);


                                        }
                                    })

                                }else{
                                    alert("You should be logged in...")
                                }
                            }}

                        >
                            <div className={`flex justify-center gap-2 max-sm:flex-col flex-col w-full flex-wrap p-2 items-center text-black ${candidateVoted === candidate._id ? "text-white " : ""} font-["Montserrat"]   `}>

                                <a

                                    className={`${candidateVoted === candidate._id ? "text-white " : ""} `}
                                >

                                    {candidate.desc}
                                </a>
                                {username && candidateArrayNum[i] ? < p className={`${candidateVoted === candidate._id ? "text-white " : ""} `}> {candidateArrayNum[i].toFixed()}%</p> : ""}
                            </div>
                        </div>
                    ))}




                </div>
                {/* <div className='flex w-full'>
                    {candidates.map((candidate, i) => (
                        <div className={`h-4 w-[50%] bg-green-100 mt-2 border-b relative  rounded-sm ${i == 0 ? "bg-green-800" : i == 1 ? "bg-green-700" : i == 2 ? "bg-green-600" : "bg-green-500"}`}></div>

                    ))}



                </div> */}
            </div>
        </li>
    )
}

export default Vote
