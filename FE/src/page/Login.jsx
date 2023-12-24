import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const handleLogin = e => {
        e.preventDefault()

        axios
            .post(
                'http://localhost:8080/login/',
                {
                    email,
                    password,
                },
                { withCredentials: true },
            )
            .then(response => {
                console.log(response)
                if (response.data.message === 'Login successful') {
                    navigate('/')
                } else if (response.data.message === 'User does not exis') {
                    alert('Check your email')
                } else if (
                    response.data.message ===
                    'Fail to Login Check your password'
                ) {
                    alert('Check your password')
                } else if (response.data.message === 'User does not exis') {
                    alert('User does not exit')
                }
            })
    }
    return (
        <div className="relative w-full h-screen   ">
            <img
                className="absolute top-0 left-0 h-full w-full  object-cover   "
                src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00NTYtMDA0XzEuanBn.jpg"
                alt=""
            />
            <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center  ">
                <div className="p-8 bg-white  rounded-2xl ">
                    <div className="flex flex-col space-y-4">
                        <header className=" font-medium text-4xl">Login</header>
                        <form
                            onSubmit={handleLogin}
                            action=""
                            className="flex flex-col "
                        >
                            <div className="mt-2 flex flex-col text-xl ">
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
                            <div className="mt-5 flex flex-col  text-xl ">
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

                            <button className="rounded-full  text-xl mt-8 text-right border-2 self-end px-4 p-2 bg-gradient-to-r from-blue-300 to-pink-300 ">
                                Submit
                            </button>
                        </form>
                        <div className=" font-medium">
                            <div>Don't have Account ?</div>
                            <Link
                                to={'/register'}
                                className=" text-blue-700 underline "
                            >
                                <div>Register Now !</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
