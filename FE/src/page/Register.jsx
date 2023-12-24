import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [validUserName, setValidUserName] = useState(false)
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        axios
            .post('http://localhost:8080/register/', {
                userName,
                email,
                password,
            })
            .then(result => {
                console.log(result)
                if (result.data.message === 'Register successful') {
                    navigate('/login')
                } else if (result.data.message === 'Email đã tồn tại') {
                    alert('User already Exis !')
                } else if (result.data.message === 'Name đã tồn tại') {
                    alert('Name already Exis !')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="relative w-full h-screen   ">
            <img
                className="absolute top-0 left-0 h-full w-full  object-cover   "
                src="https://images8.alphacoders.com/133/1337526.png"
                alt=""
            />
            <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center  ">
                <div className="p-8 bg-white  rounded-2xl ">
                    <div className="flex flex-col space-y-4">
                        <header className=" font-medium text-4xl">
                            Register
                        </header>
                        <form
                            onSubmit={handleRegister}
                            action=""
                            className="flex flex-col "
                        >
                            <div className="mt-3 flex flex-col text-xl">
                                <label htmlFor="name">First Name </label>
                                <input
                                    onChange={e => setUserName(e.target.value)}
                                    id="name"
                                    className=" mt-1  rounded-full sm:min-w-[400px] border-2 border-black px-4 focus:outline-none focus:border-2 focus:border-blue-400 p-2  "
                                    type="text"
                                    placeholder="Enter your Name"
                                    required
                                />
                                {validUserName === true && (
                                    <div className="">
                                        Required less than 10 words
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex flex-col text-xl">
                                <label htmlFor="email">Email </label>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    id="email"
                                    className=" mt-1  rounded-full sm:min-w-[400px] border-2 border-black px-4 focus:outline-none focus:border-2 focus:border-blue-400 p-2  "
                                    type="email"
                                    placeholder="Enter your Email"
                                    required
                                />
                            </div>
                            <div className="mt-3 flex flex-col text-xl">
                                <label htmlFor="pass">Password</label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    id="pass"
                                    className="mt-1 rounded-full  sm:min-w-[400px] border-2 border-black px-4 focus:outline-none focus:border-2 focus:border-blue-400 p-2  "
                                    type="password"
                                    placeholder="Enter your Password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-full  text-xl mt-8 text-right border-2 self-end px-4 p-2 bg-gradient-to-r from-blue-300 to-pink-300 "
                            >
                                Submit
                            </button>
                        </form>
                        <div className=" font-medium">
                            <div>You Already have account ?</div>
                            <Link
                                to={'/login'}
                                className=" text-blue-700 underline "
                            >
                                <div>Login Now !</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
