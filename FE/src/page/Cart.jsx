import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import React from 'react'
import { Clear } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
    decreaseProduct,
    increaseProduct,
    removeProduct,
} from '../redux/quickVCartSlice'

export default function Cart() {
    const cartItem = useSelector(state => state.quickVCart.cartItem)
    console.log('#### CART PAGE #######')
    console.log('takecartItem===Cartpage', cartItem)
    const dispatch = useDispatch()
    const allTotal = useSelector(state => state.quickVCart.allTotal)
    console.log('cart allTotal', allTotal)

    const increaseQuantity = (productId, colorr) => {
        dispatch(
            increaseProduct({
                productId: productId,
                colorr: colorr,
                quantity: 1,
            }),
        )
    }
    const decreaseQuantity = (productId, colorr) => {
        dispatch(
            decreaseProduct({
                productId: productId,
                colorr: colorr,
                quantity: 1,
            }),
        )
    }

    const removeProductItem = (productId, color) => {
        console.log('removeProductItem****')
        dispatch(
            removeProduct({
                productId: productId,
                color: color,
            }),
        )
    }

    return (
        <div>
            <Navbar />
            <div className="mt-[104px] p-5 sm:p-0">
                <div className="max-w-md sm:max-w-4xl  mx-auto py-8 flex flex-col sm:flex-row sm:space-x-8">
                    {/* LEFT */}
                    <div className="  sm:w-2/3  ">
                        <div className="py-2 text-xl font-bold">
                            Giỏ hàng của tôi
                        </div>

                        {cartItem.map((data, index) => (
                            <div key={index}>
                                <hr className="border-0 h-[2px] bg-[#D0D0D0] w-full " />
                                {/* ITEMS */}
                                <div className=" my-7  flex justify-between">
                                    <div className="flex space-x-5">
                                        <div className="h-100 w-100 border">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={data.imgChoosed}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold mb-3">
                                                {data.products.title}
                                            </div>
                                            <div>
                                                <div>
                                                    {data.products.price} VND
                                                </div>
                                                <div className="text-gray-500">
                                                    Màu: {data.color}
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
                                                    data.quantity === 1
                                                        ? ' bg-gray-100 text-gray-300 '
                                                        : ''
                                                } `}
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        data.products.id,
                                                        data.color,
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span>{data.quantity}</span>
                                            <button
                                                className="px-3 py-[2px]"
                                                onClick={() =>
                                                    increaseQuantity(
                                                        data.products.id,
                                                        data.color,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </span>
                                        <span className="font-bold">
                                            {data.total} VND
                                        </span>
                                        <span
                                            onClick={e => {
                                                e.stopPropagation() // Ngăn chặn sự kiện navigate lan tỏa lên phần tử cha
                                                removeProductItem(
                                                    data.products.id,
                                                    data.color,
                                                )
                                            }}
                                            className=" cursor-pointer"
                                        >
                                            <Clear className="text-gray-500" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <hr className="border-0 h-[1px] bg-[#D0D0D0] " />
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
                                <span>{allTotal} VND</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Tiền Ship</span>
                                <span>50000 VND</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Discount Ship</span>
                                <span>- 50000 VND</span>
                            </div>
                        </div>
                        <hr className="mt-2 border-0 h-[2px] bg-[#D0D0D0] " />
                        <div className="my-3 font-bold text-xl flex justify-between">
                            <span>Tổng</span>
                            <span>{allTotal} VND</span>
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
