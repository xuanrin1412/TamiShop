import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useLocation, useNavigate } from 'react-router-dom'
import QuickViewCartItem from './QuickViewCartItem'
import { useSelector } from 'react-redux'
import Badge from '@mui/material/Badge'

export default function Navbar() {
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false)
    const [openCartDemo, setOpenCartDemo] = useState(false)

    const quantityProduct = useSelector(state => state.quickVCart.cartItem)
    const testQuantity = quantityProduct.map(quantity => quantity.quantity)
    const allQuantity = testQuantity.reduce(
        (acc, currentValue) => acc + currentValue,
        0,
    )
    console.log('resultQuantity', allQuantity)
    console.log('quantityProduct', testQuantity)

    const [activeNav, setActiveNav] = useState('cuahang')

    const location = useLocation()
    const path = location.pathname
    console.log('path', path)

    const handleClick = type => {
        setActiveNav(type)
    }

    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
    }

    const handleOpenCart = () => {
        setOpenCartDemo(true)
    }
    const handleCloseCart = () => {
        setOpenCartDemo(false)
    }

    return (
        <div className="w-full bg-slate-100 py-5 px-[50px] flex justify-between items-center top-0 left-0 fixed z-20 ">
            <div className="flex flex-col">
                <h2
                    className="text-4xl font-medium"
                    onClick={() => navigate('/')}
                >
                    Tò Te
                </h2>
                <h3 className="font-medium">Túi in họa tiết cá tính </h3>
            </div>
            {/* HIDDEN NAV */}
            <div className="hidden sm:flex sm:space-x-5">
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

            {/*  RIGHT */}
            <div className="relative  sm:space-x-5  flex flex-col-reverse  sm:items-center sm:flex-row">
                {/* search bar */}
                <div
                    className={`flex items-center ${
                        isFocused ? 'border-b-0' : 'border-b-2 border-black'
                    }`}
                >
                    <div className="p-2">
                        <SearchIcon />
                    </div>
                    <input
                        className="max-w-[140px] outline-none bg-slate-100"
                        type="text"
                        placeholder="Tìm kiếm..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
                {isFocused ? (
                    <div className="absolute top-full min-w-[189px] max-w-[250px] -left-2 bg-white z-50">
                        <div className="font-medium p-3">
                            Sản phẩm thịnh hành
                        </div>
                        <div className="flex hover:bg-slate-200 items-center">
                            <div className="h-[60px] w-[60px] p-1">
                                <img
                                    className="h-full w-full object-contain"
                                    src="https://static.wixstatic.com/media/45d10e_45e21af15e5a4e2fa81bc324b0c51cbf~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_45e21af15e5a4e2fa81bc324b0c51cbf~mv2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="p-3 text-[15px]">
                                <div>Tôi là sản phẩm </div>
                                <div>Tôi là mô tả sản phẩm... </div>
                            </div>
                        </div>
                        <div className="flex hover:bg-slate-200 items-center">
                            <div className="h-[60px] w-[60px] p-1">
                                <img
                                    className="h-full w-full object-contain"
                                    src="https://static.wixstatic.com/media/45d10e_45e21af15e5a4e2fa81bc324b0c51cbf~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_45e21af15e5a4e2fa81bc324b0c51cbf~mv2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="p-3 text-[15px]">
                                <div>Tôi là sản phẩm </div>
                                <div>Tôi là mô tả sản phẩm... </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {/* avatar */}
                <div className="hidden sm:block">
                    <Avatar
                        className="hidden sm:flex"
                        alt="Remy Sharp"
                        src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/324584455_487810650192880_3422462454493528535_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeG2KKxsy3K67OvqmZab_-tj5lEq_COPT3_mUSr8I49Pf4ztIrWxyRTzkDLUyGo3rMbllewwAwSmuAOtr_4rh1aj&_nc_ohc=ZrJeRK1Jq4gAX8HA0Mp&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfCzbNIVNMNIuMVGBB6MBaCPyYnqHJwcmUVgETYcLB3erQ&oe=657324BB"
                    />
                </div>
                <span className="font-medium hidden sm:flex">Đ.Nhập</span>
                <div>
                    <div className=" float-right sm:float-none space-x-5 sm:space-x-0 flex  items-center  sm:flex-none  ">
                        <Badge badgeContent={allQuantity} color="primary">
                            <ShoppingCartIcon
                                onClick={handleOpenCart}
                                className="w-9 h-9"
                                // style={{ width: '2.2rem', height: '2.2rem' }}
                            />
                        </Badge>

                        <span className="sm:hidden text-4xl">&#9776;</span>
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
                        <div className="bg-black  text-white flex justify-end items-center text-center p-7">
                            <span className="text-2xl flex-none">
                                <ArrowForwardIosIcon
                                    onClick={handleCloseCart}
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
        </div>
    )
}
