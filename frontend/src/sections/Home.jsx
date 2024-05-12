
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Vote from '../components/Vote'
import { people } from '../constants'
import { GET, POST, username } from '../API'
import SignRegi from '../components/SignRegi'
import CandidateInput from '../components/CandidateInput'
function Home() {
    const [backendVotes, setBackendVotes] = useState([])
    const [toogleCreate, setToogleCreate] = useState(false)
    const [toogleVote, setToogleVote] = useState(false)
    const [createVoteForm, setCreateVoteForm] = useState({
        title: "",
        cand1: "",
        cand2: "",
        cand3: "",
        cand4: ""
    })
    const [search, setSearch] = useState({
        searchPhrase: ""


    })
    useEffect(() => {
        console.log(search.searchPhrase);
        if (search.searchPhrase) {
            GET(`votes/search?title=${search.searchPhrase}`).then(response => {
                console.log(response.data);
                setBackendVotes(response.data.votes)
    
                
            })
            
        }else{
            GET(`votes`).then(response => {
                console.log(response.data);
                setBackendVotes(response.data.votes)
    
                
            })
        }
    }, [toogleCreate, search.searchPhrase])

    

    try {
        let m = []
        let a = backendVotes.map(vote => {
            console.log(vote.candidates);
            return vote.candidates.map(candidate => {
                m.push(candidate.voter)
                return candidate.voter
            })
        })
        let newArr = m.flat()
        console.log(newArr);
        if (newArr.includes(username)) {
            console.log("voted already ");
            
        }
        
    } catch (error) {
        
    }


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setCreateVoteForm(prevStat => {

            return {
                ...prevStat,
                [name]: type === "checkbox" ? checked : value,

            }
        })
        

    }
    const handleSearch = (event) => {
        const { name, value, type, checked } = event.target
        setSearch(prevStat => {

            return {
                ...prevStat,
                [name]: type === "checkbox" ? checked : value,

            }
        })
        

        console.log(search);
        

    }



    return (
        <div className='bg-white'>
            <Nav />
            

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <SignRegi />
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[180deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl  ">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">

                    </div>
                    <div className="text-center ">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl capitalize">
                            Make your vote now!
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            This is a straightforward project that allows you to cast and create votes. Keep in mind that all you need to use this service is a username, which is simple to create.
                        </p>
                        <button
                            type="button"
                            onClick={()=> {
                                if (!username) {
                                    alert("First You should add a username to create a voting, Thank You")
                                    
                                }else{

                                    setToogleCreate(true)
                                }
                            }}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-l-8 mt-4 "
                        >
                            Create Voting
                        </button>
                        { toogleCreate && <div className='border-b p-4 flex flex-col items-start justify-center gap-2' >
                            <CandidateInput isOptional={false} name={"title"} value={createVoteForm.title} handleChange={handleChange} />
                            <div className=' flex gap-2 max-sm:flex-wrap' >
                                <CandidateInput
                                    isOptional={false}
                                    name={"cand1"}
                                    value={createVoteForm.cand1}
                                    handleChange={handleChange}
                                />
                                <CandidateInput
                                    isOptional={false}
                                    name={"cand2"}
                                    value={createVoteForm.cand2}
                                    handleChange={handleChange}
                                />
                                <CandidateInput
                                    isOptional={true}
                                    name={"cand3"}
                                    value={createVoteForm.cand3}
                                    handleChange={handleChange}
                                />
                                <CandidateInput
                                    isOptional={true}
                                    name={"cand4"}
                                    value={createVoteForm.cand4}
                                    handleChange={handleChange}
                                />
                            </div>
                            <div className='flex gap-4'>
                            <button
                            onClick={(e)=>{
                                e.preventDefault()
                                let candidates = []
                                if (createVoteForm.cand1) {
                                    candidates.push({desc: createVoteForm.cand1, voter: []})
                                    
                                }
                                if (createVoteForm.cand2) {
                                    candidates.push({desc: createVoteForm.cand2, voter: []})
                                    
                                }
                                if (createVoteForm.cand3) {
                                    candidates.push({desc: createVoteForm.cand3, voter: []})
                                    
                                }
                                if (createVoteForm.cand4) {
                                    candidates.push({desc: createVoteForm.cand4, voter: []})
                                    
                                }

                                POST("votes", {
                                    title: createVoteForm.title,
                                    created_by: username,
                                    candidates: candidates
                                }).then(response => {
                                    console.log(response);
                                    if (response.status === 200) {
                                        alert("Voting has been created")
                                        setCreateVoteForm({
                                            title: "",
                                            cand1: "",
                                            cand2: "",
                                            cand3: "",
                                            cand4: "",
                                        })
                                        setToogleCreate(false)
                                    }else{
                                        alert("Someting went wrong")
                                    }
                                })

                            }}
                                type="button"
                                
                                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-l-8 mt-4 w-[100px] "
                            >
                                Post 
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setToogleCreate(false)
                                }}
                                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-l-8 mt-4 w-[100px] "
                            >
                                Cancel 
                            </button>

                            </div>
                            
                            


                        </div>}
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {/* <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a> */}
                            <div className='w-full'>

                                <input
                                    onChange={handleSearch}
                                    value={search.searchPhrase}
                                    type="text"
                                    name="searchPhrase"
                                    id="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                    placeholder="Search vote title"
                                />
                            </div>

                            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a> */}

                        </div>
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8 ">
                            {backendVotes && backendVotes.map((vote) => (
                                <Vote {...vote} toogleVote= {()=> {
                                    setToogleVote(!toogleVote)
                                }}/>

                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>

    )
}

export default Home
