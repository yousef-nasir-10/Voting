import { useEffect, useState } from 'react'
import { POST, myDecodedToken, username } from '../API'


function SignRegi() {
    const [form, setForm] = useState({
        username: ""
    })
    const [msg, setMsg] = useState({
        loginMsg: "",
        signUpMsg: ""
    })

    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if (username) {
            setIsSignedIn(true)
        }
    })



    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setForm(prevStat => {

            return {
                ...prevStat,
                [name]: type === "checkbox" ? checked : value,

            }
        })
        console.log(form);

    }
    return (
        <div>
            <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-sm space-y-10">

                    {!isSignedIn ? <form className="space-y-6" >
                        <p className="text-center text-sm leading-6 text-gray-500">
                            If you have already created a username, then type your username and click sign in {' '}
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                IF NOT click sign up .
                            </a>
                            <p href="#" className="font-semibold text-red-600 hover:text-red-500 uppercase">
                                no password needed.
                            </p>
                        </p>
                        <div className="relative -space-y-px rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="email-address"
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.username}
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Username"
                                />

                            </div>


                        </div>




                        <div className='flex gap-4 justify-center '>
                            <button
                                type="submit"
                                className="flex w-2/6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    e.preventDefault()
                                    POST("users/login", { username: form.username }).then(response => {
                                        console.log(response);

                                        if (response.data.status === "OK" || username) {
                                            setMsg(prevMsg => {
                                                return {
                                                    ...prevMsg,
                                                    loginMsg: "You are ready to go! if notice something wired. You can contact me by contacting me. thank you"
                                                }
                                            })
                                            localStorage.setItem("token", response.data.data)
                                        } else if (response.data.status === 400) {

                                            setMsg(prevMsg => {
                                                return {
                                                    ...prevMsg,
                                                    loginMsg: "Username is not in my database. Create it if You would. "
                                                }
                                            })
                                        }
                                    })

                                }}
                            >
                                Sign in
                            </button>
                            <button
                                type="submit"
                                className="flex w-2/6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    e.preventDefault()
                                    POST("users/regi", { username: form.username }).then(response => {

                                        if (response.data.status === 400) {
                                            setMsg(prevMsg => {
                                                return {
                                                    ...prevMsg,
                                                    signUpMsg: "Username is already in use. If yours? kindly sign in "
                                                }
                                            })
                                        } else if (response.data.status === 200) {
                                            setMsg(prevMsg => {
                                                return {
                                                    ...prevMsg,
                                                    signUpMsg: "Username created sesssfully"
                                                }
                                            })

                                            POST("users/login", { username: form.username }).then(response => {
                                                console.log(response);
        
                                                if (response.data.status === "OK" || username) {
                                                    setMsg(prevMsg => {
                                                        return {
                                                            ...prevMsg,
                                                            loginMsg: "You are ready to go! if notice something wired. You can contact me by contacting me. thank you"
                                                        }
                                                    })
                                                    localStorage.setItem("token", response.data.data)
                                                } else if (response.data.status === 400) {
        
                                                    setMsg(prevMsg => {
                                                        return {
                                                            ...prevMsg,
                                                            loginMsg: "Username is not in my database. Create it if You would. "
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }}
                            >
                                Sign up
                            </button>




                        </div>
                        <h1 className='text-center text-sm font-semibold text-red-600 hover:text-red-500 capitalize  '>{msg.signUpMsg && msg.signUpMsg}</h1>
                        {/* <h1 className='text-center text-sm font-semibold text-red-600 hover:text-red-500 capitalize  '>{msg.loginMsg && msg.loginMsg }</h1> */}
                        <div>


                        </div>
                    </form>: ""}


                </div>
            </div>
        </div>
    )
}

export default SignRegi
