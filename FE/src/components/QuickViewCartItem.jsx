import { Clear } from '@mui/icons-material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuickViewCartItem() {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    const decreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1)
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div className=" h-full ">
            {/* LIST ITEM IN CART */}
            <div className="max-h-[72%] w-full  overflow-auto  scroll">
                {/* ITEMS */}
                <div className="relative p-6 flex group">
                    <div className="h-[80px] w-[80px]">
                        <img
                            className="h-full w-full object-cover"
                            src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                            alt=""
                        />
                    </div>
                    <div className="ml-7 text-[17px] flex flex-col">
                        <span>Tôi là sản phẩmdsfsdf</span>
                        <span>300.000VND</span>
                        <span
                            className="mt-2 border border-black  justify-between max-w-[100px] flex items-center"
                            style={{ zIndex: 1 }}
                        >
                            <button
                                className={`px-3 py-1  ${
                                    quantity === 1
                                        ? ' bg-gray-100 text-gray-300 '
                                        : ''
                                } `}
                                onClick={decreaseQuantity}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <div>{quantity}</div>
                            <button
                                className="px-3 py-1  "
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </span>
                    </div>

                    <div className="absolute right-4 top-0 h-full w-full flex justify-end items-center">
                        <div className=" opacity-0 group-hover:opacity-100  cursor-pointer p-1 ">
                            <Clear />
                        </div>
                    </div>
                </div>
                <hr class="w-5/6 mx-auto h-px border-0 bg-gray-400" />
            </div>

            {/* TOTAL COST */}
            <div className="absolute right-0  bottom-0 z-50 text-2xl  w-full text-center">
                <div className="p-4 bg-white  border-t-2 border text-3xl font-bold">
                    Tổng Tiền : <span>500 VND</span>
                </div>
                <div
                    className="p-2 m-5 text-white  bg-black hover:opacity-80 cursor-pointer  "
                    onClick={() => navigate('/cart')}
                >
                    Xem giỏ hàng
                </div>
            </div>
        </div>
    )
}
