import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import React, { useState } from 'react'

import { Clear } from '@mui/icons-material'
export default function Cart() {
    const [quantity, setQuantity] = useState(1)

    const decreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1)
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    return (
        <div>
            <Navbar />
            <div className="mt-[104px] p-5 sm:p-0">
                <div className="max-w-md sm:max-w-4xl  mx-auto py-8 flex flex-col sm:flex-row sm:space-x-8">
                    {/* LEFT */}
                    <div className="  sm:w-2/3 ">
                        <div className="py-2 text-xl font-bold">
                            Giỏ hàng của tôi
                        </div>

                        <hr className="border-0 h-[2px] bg-[#D0D0D0] w-full " />
                        {/* ITEMS */}
                        <div className=" my-7  flex justify-between">
                            <div className="flex space-x-5">
                                <div className="h-100 w-100 border">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <div className="font-bold mb-3">
                                        Tôi là sản phẩm
                                    </div>
                                    <div>
                                        <div>300.000VND</div>
                                        <div className="text-gray-500">
                                            Màu: Xanh bạc hà
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <span
                                    className=" border border-black  justify-between flex items-center h-[31px]"
                                    style={{ zIndex: 1 }}
                                >
                                    <button
                                        className={`px-3 py-[2px]  ${
                                            quantity === 1
                                                ? ' bg-gray-100 text-gray-300 '
                                                : ''
                                        } `}
                                        onClick={decreaseQuantity}
                                        disabled={quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        className="px-3 py-[2px]  "
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </span>
                                <span className="font-bold">300.000VND</span>
                                <span className=" cursor-pointer">
                                    <Clear className="text-gray-500" />
                                </span>
                            </div>
                        </div>
                        <hr className="border-0 h-[1px] bg-[#D0D0D0] " />
                        {/* ITEMS */}
                        <div className=" my-7  flex justify-between">
                            <div className="flex space-x-5">
                                <div className="h-100 w-100 border">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <div className="font-bold mb-3">
                                        Tôi là sản phẩm
                                    </div>
                                    <div>
                                        <div>300.000VND</div>
                                        <div className="text-gray-500">
                                            Màu: Xanh bạc hà
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <span
                                    className=" border border-black  justify-between flex items-center h-[31px]"
                                    style={{ zIndex: 1 }}
                                >
                                    <button
                                        className={`px-3 py-[2px]  ${
                                            quantity === 1
                                                ? ' bg-gray-100 text-gray-300 '
                                                : ''
                                        } `}
                                        onClick={decreaseQuantity}
                                        disabled={quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        className="px-3 py-[2px]  "
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </span>
                                <span className="font-bold">300.000VND</span>
                                <span className=" cursor-pointer">
                                    <Clear className="text-gray-500" />
                                </span>
                            </div>
                        </div>
                        <hr className="border-0 h-[2px] bg-[#D0D0D0] " />
                    </div>
                    {/* RIGHT */}
                    <div className="w-5/6 sm:w-1/3 mx-auto sm:mx-0">
                        <div className="py-2 text-xl font-bold">
                            Tóm tắt đơn hàng
                        </div>
                        <hr className="border-0 h-[2px] bg-[#D0D0D0] " />
                        <div className="mt-7 space-y-2">
                            <div className="flex justify-between font-bold">
                                <span>Tổng từng phần</span>
                                <span>900.000₫</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Tiền Ship</span>
                                <span>50.000₫</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Discount Ship</span>
                                <span>- 50.000₫</span>
                            </div>
                        </div>
                        <hr className="mt-2 border-0 h-[2px] bg-[#D0D0D0] " />
                        <div className="my-3 font-bold text-xl flex justify-between">
                            <span>Tổng</span>
                            <span>900.000₫</span>
                        </div>
                        <button className="w-full bg-black text-white py-2 hover:opacity-80">
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
