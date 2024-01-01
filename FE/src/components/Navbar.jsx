import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useLocation, useNavigate } from 'react-router-dom'
import QuickViewCartItem from './QuickViewCartItem'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@mui/material/Badge'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { fetchUserCartProduct, searchProduct } from '../redux/cartSlice'
import { Clear } from '@mui/icons-material'

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location = useLocation()
    const path = location.pathname
    const [activeNav, setActiveNav] = useState('cuahang')

    const [userName, setUserName] = useState('')

    const [openLogOutBox, setOpenLogOutBox] = useState(false)
    const [openCartDemo, setOpenCartDemo] = useState(false)

    const [isFocused, setIsFocused] = useState(false)
    const [bestseller, setBestseller] = useState([])

    // TAKE OUT TOTAL QUANTITY
    const cartItems = useSelector(state => state.Cart.items.getCart) ?? []
    const arrayTotalQuantity = cartItems && cartItems.map(item => item.quantity)
    const totalQuantity = arrayTotalQuantity.reduce(
        (acc, item) => acc + item,
        0,
    )

    // HANDLE ACTIVE NAV
    const handleClick = type => {
        setActiveNav(type)
    }

    // HANDLE FOCUS INPUT SEARCH SHOW TEXT BESTSELLER & CLICK OUTSIDE DISAPPEAR
    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBodyClick = event => {
        if (!event.target.closest('.bestseller-area')) {
            setIsFocused(false)
        }
    }

    // HANDLE OPEN CLOSE CART
    const handleOpenCart = () => {
        setOpenCartDemo(true)
    }
    const handleCloseCart = () => {
        setOpenCartDemo(false)
    }

    // HANDLE OPEN-CLOSE LOGOUT & CALL API LOGOUT
    const handleOpenLogOut = () => {
        setOpenLogOutBox(true)
    }
    const handleCloseLogOut = () => {
        setOpenLogOutBox(false)
    }
    const handleLogOut = () => {
        axios
            .delete('http://localhost:8080/login/', { withCredentials: true })
            .then(result => {
                console.log('result log out', result.data.message)
                if (result.data.message === 'Logout Success') {
                    setOpenLogOutBox(false)
                    navigate('/')
                    setUserName('')
                    dispatch(fetchUserCartProduct())
                }
            })
    }

    // HANDLE NAVIGATE TO INFO BESTSELLER ITEM IN SEARCH
    const handleNavigate = id => {
        navigate(`/infoProduct/${id}`)
        console.log('handleNavigate', navigate(`/infoProduct/${id}`))
    }

    // HANDLE SEARCH SEND DATA TO SEARCH PRODUCT PAGE
    const [textSearch, setTextSearch] = useState('')
    const handleSearch = () => {
        //PARSE DATA TO REDUX AND SET IT TO TEXTSEARCH
        dispatch(searchProduct({ textSearch }))
        navigate('/searchProduct')
    }
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSearch()
            setIsFocused(false)
        }
    }

    // HANDLE OPEN CLOSE HAMBURGER MENU (MOBILE)
    const [openHamburger, setOpenHamburger] = useState(false)
    const handleOnClickOpenHam = () => {
        setOpenHamburger(true)
    }
    const handleCloseHam = () => {
        setOpenHamburger(false)
    }

    useEffect(() => {
        const token = Cookies.get('tokenJWT')
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                console.log('decodedToken==========', decodedToken)
                setUserName(decodedToken.userName)
            } catch (error) {
                console.error('Error decoding token:', error)
            }
        }

        const fetchData = async () => {
            try {
                await dispatch(fetchUserCartProduct())
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()

        const bestsellerapi = async () => {
            await axios
                .get('http://localhost:8080/bag/getBestSeller/')
                .then(response => {
                    setBestseller(response.data.getBestSeller)
                })
                .catch(error => {
                    console.error('Error fetching Featured products:', error)
                })
        }
        bestsellerapi()

        document.body.addEventListener('click', handleBodyClick)
        return () => document.body.removeEventListener('click', handleBodyClick)
    }, [totalQuantity, dispatch])

    return (
        <div className=" w-full bg-slate-100 py-5 h-[104px] px-[20px] sm:px-[50px] flex justify-between items-center top-0 left-0 fixed z-20 ">
            <div className="flex flex-col">
                <h2
                    className="text-4xl font-medium"
                    onClick={() => navigate('/')}
                >
                    Tami
                </h2>
                <h3 className=" font-medium opacity-50 hidden sm:flex">
                    Thế giới túi sách
                </h3>
            </div>
            {/*NAV BAR*/}
            <div className="hidden sm:flex sm:space-x-5">
                <span
                    onClick={() => {
                        navigate('/manager')
                        setActiveNav(activeNav === '')
                    }}
                    className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                        path === '/manager' ? 'activeNav' : ''
                    }`}
                >
                    Quản lý
                </span>
                <span
                    onClick={() => {
                        handleClick('cuahang')
                        navigate('/#cuahang')
                    }}
                    className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                        activeNav === 'cuahang' && path === '/'
                            ? 'activeNav'
                            : ''
                    }`}
                >
                    <a href="#cuahang">Cửa hàng</a>
                </span>

                <span
                    onClick={() => {
                        handleClick('gioithieu')
                        navigate('/#gioithieu')
                    }}
                    className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                        activeNav === 'gioithieu' && path === '/'
                            ? 'activeNav'
                            : ''
                    }`}
                >
                    <a href="#gioithieu">Giới thiệu</a>
                </span>
                <span
                    onClick={() => {
                        navigate('/question')
                        setActiveNav(activeNav === '')
                    }}
                    className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                        path === '/question' ? 'activeNav' : ''
                    }`}
                >
                    Hỏi đáp
                </span>
                <span
                    onClick={() => {
                        navigate('/contact')
                        setActiveNav(activeNav === '')
                    }}
                    className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                        path === '/contact' ? 'activeNav' : ''
                    }`}
                >
                    Liên hệ
                </span>
            </div>
            {/* NAVBAR FOR MOBILE */}
            {openHamburger === true && (
                <div className="flex absolute top-0 left-0  flex-col items-center justify-center  text-4xl space-y-9 bg-white h-screen w-full z-50">
                    <div
                        onClick={() => handleCloseHam()}
                        className=" absolute top-10 right-10  text-black hover:opacity-60"
                    >
                        <Clear style={{ fontSize: '50px' }} />
                    </div>
                    {userName ? (
                        <span className=" items-center space-x-4 font-bold ">
                            <span>
                                User:{' '}
                                <span className="  uppercase">{userName}</span>
                            </span>
                        </span>
                    ) : (
                        <span className=" font-medium flex space-x-3">
                            <Link to={'/login'}>
                                <span>Đăng Nhập</span>
                            </Link>
                            <span className="h-10 sm:h-6 w-1 bg-black"></span>
                            <Link to={'/register'}>
                                <span>Đăng Kí</span>
                            </Link>
                        </span>
                    )}

                    <span
                        onClick={() => {
                            handleClick('cuahang')
                            navigate('/#cuahang')
                            handleCloseHam()
                        }}
                        className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                            activeNav === 'cuahang' && path === '/'
                                ? 'activeNav'
                                : ''
                        }`}
                    >
                        <a href="#cuahang">Cửa hàng</a>
                    </span>
                    <span
                        onClick={() => {
                            navigate('/manager')
                            setActiveNav(activeNav === '')
                        }}
                        className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                            path === '/manager' ? 'activeNav' : ''
                        }`}
                    >
                        Quản lý
                    </span>
                    <span
                        onClick={() => {
                            handleClick('gioithieu')
                            navigate('/#gioithieu')
                            handleCloseHam()
                        }}
                        className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                            activeNav === 'gioithieu' && path === '/'
                                ? 'activeNav'
                                : ''
                        }`}
                    >
                        <a href="#gioithieu">Giới thiệu</a>
                    </span>
                    <span
                        onClick={() => {
                            navigate('/question')
                            setActiveNav(activeNav === '')
                            handleCloseHam()
                        }}
                        className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                            path === '/question' ? 'activeNav' : ''
                        }`}
                    >
                        Hỏi đáp
                    </span>
                    <span
                        onClick={() => {
                            navigate('/contact')
                            setActiveNav(activeNav === '')
                            handleCloseHam()
                        }}
                        className={`font-medium hover:opacity-70 cursor-pointer whitespace-no-wrap flex-shrink-0 min-w-[0] ${
                            path === '/contact' ? 'activeNav' : ''
                        }`}
                    >
                        Liên hệ
                    </span>
                    {userName ? (
                        <div className="h-10 w-10 object-cover flex">
                            <img
                                onClick={handleOpenLogOut}
                                className="h-full w-full"
                                src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png"
                                alt=""
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            )}

            {/*  RIGHT */}
            <div className="relative  sm:space-x-6  flex flex-col-reverse  sm:items-center sm:flex-row">
                {/*SEARCH BAR*/}
                <div
                    className={`bestseller-area flex items-center ${
                        isFocused ? 'border-b-0' : 'border-b-2 border-black'
                    }`}
                >
                    <div className="p-2">
                        <SearchIcon />
                    </div>
                    <input
                        className="max-w-[160px] outline-none bg-slate-100"
                        type="text"
                        placeholder="Tìm kiếm..."
                        onFocus={handleFocus}
                        value={textSearch}
                        onChange={e => setTextSearch(e.target.value)}
                        onKeyDown={e => handleKeyPress(e)}
                    />
                    <div
                        className={` ${
                            textSearch ? 'opacity-100' : ' opacity-0'
                        }`}
                    >
                        <Clear
                            onClick={() => setTextSearch('')}
                            className=" opacity-100 hover:opacity-50 cursor-pointer"
                            style={{ fontSize: '17px' }}
                        />
                    </div>
                </div>
                {/* FOCUS TOGGLE BEST SELLER PRODUCT */}
                {isFocused ? (
                    <>
                        <div className=" absolute top-full min-w-[189px] max-w-[250px] max-h-72 overflow-y-scroll scroll -left-2 bg-white z-50  boxShadow">
                            <div className="font-medium p-3">
                                Sản phẩm thịnh hành
                            </div>
                            {/* ITEM BESTSELLER */}
                            {bestseller.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex hover:bg-slate-200 items-center p-2"
                                    onClick={() => handleNavigate(item.id)}
                                >
                                    <div className="h-[60px] w-[60px] p-1">
                                        <img
                                            className="h-full w-full object-contain"
                                            src={item.colorimg[0].img[0]}
                                            alt=""
                                        />
                                    </div>
                                    <div className=" pl-[2px]">
                                        <div className=" whitespace-nowrap  w-40 overflow-hidden text-ellipsis ">
                                            {item.title}
                                        </div>
                                        <div className=" text-[13px] font-normal text-gray-400 whitespace-nowrap  w-40 overflow-hidden text-ellipsis ">
                                            {item.des}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    ''
                )}

                {/* USER */}
                {userName ? (
                    <span className=" hidden sm:flex font-medium  items-center space-x-4 ">
                        <span>
                            User:{' '}
                            <span className=" text-xl text-red-500 uppercase">
                                {userName}
                            </span>
                        </span>
                        <div className="h-5 w-5 object-cover flex">
                            <img
                                onClick={handleOpenLogOut}
                                className="h-full w-full"
                                src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png"
                                alt=""
                            />
                        </div>
                    </span>
                ) : (
                    <span className=" hidden font-medium sm:flex space-x-3">
                        <Link to={'/login'}>
                            <span>Đăng Nhập</span>
                        </Link>
                        <span className="h-6 w-1 bg-black"></span>
                        <Link to={'/register'}>
                            <span>Đăng Kí</span>
                        </Link>
                    </span>
                )}
                {/* CART & HAMBURGER */}
                <div>
                    <div className=" float-right sm:float-none space-x-5 sm:space-x-0 flex  items-center  sm:flex-none  ">
                        <Badge badgeContent={totalQuantity} color="primary">
                            <ShoppingCartIcon
                                onClick={handleOpenCart}
                                className="w-9 h-9"
                                // style={{ width: '2.2rem', height: '2.2rem' }}
                            />
                        </Badge>

                        <span
                            onClick={() => handleOnClickOpenHam()}
                            className="sm:hidden text-4xl"
                        >
                            &#9776;
                        </span>
                    </div>
                </div>
            </div>
            {/* OPEN CART */}
            {openCartDemo ? (
                <div
                    className=" absolute top-0 right-0 h-[100vh] w-[100vw] z-50  ease-in-out duration-300
                   translate-x-0  
                "
                >
                    <div
                        onClick={handleCloseCart}
                        className="flex absolute top-0 right-0 h-full w-full bg-gray-400 opacity-60 z-40"
                    ></div>
                    <div className="absolute top-0 right-0 w-[400px] h-full bg-white z-50 flex flex-col ">
                        <div className="bg-black  text-white flex justify-end items-center text-center p-5">
                            <span className="text-2xl flex-none">
                                <ArrowForwardIosIcon
                                    onClick={() => handleCloseCart()}
                                />
                            </span>
                            <span className="text-3xl flex-1">Giỏ hàng</span>
                        </div>

                        {/* INFO CART EMTY */}
                        <div className="hidden text-center p-6">
                            Giỏ hàng trống
                        </div>

                        {/* INFO CART HAVE PRODUCT */}
                        <QuickViewCartItem />
                    </div>
                </div>
            ) : (
                ''
            )}
            {/* LOGOUT BOX */}
            {openLogOutBox ? (
                <div className="absolute top-0 left-0 h-screen w-full bg-transparent2 z-50">
                    <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-white border-2 border-black p-8 space-y-4 rounded">
                            <div className="text-xl font-medium">
                                Bạn muốn đăng xuất ?
                            </div>
                            <div className="flex justify-between">
                                <span
                                    onClick={() => {
                                        handleLogOut()
                                        handleCloseHam()
                                    }}
                                    className="border-2 p-2 px-4 cursor-pointer hover:bg-black hover:text-white"
                                >
                                    Yes
                                </span>
                                <span
                                    onClick={() => handleCloseLogOut()}
                                    className="border-2 p-2 px-4 cursor-pointer bg-blue-300  hover:bg-black hover:text-white"
                                >
                                    No
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
