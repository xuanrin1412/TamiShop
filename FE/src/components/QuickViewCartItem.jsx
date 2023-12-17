import { Clear } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { decreaseProduct, increaseProduct } from '../redux/quickVCartSlice'

export default function QuickViewCartItem() {
    const navigate = useNavigate()

    const cartItem = useSelector(state => state.quickVCart.cartItem) // state của toàn bộ hệ thống . tên key (configureStore),dữ liệu cụ thể trong slice counter
    console.log('takecartItem', cartItem)

    const allTotal = useSelector(state => state.quickVCart.allTotal)
    console.log('quick cart allTotal', allTotal)
    const dispatch = useDispatch()

    // Function to handle increasing quantity
    const increaseQuantity = (productId, colorr) => {
        // Dispatch the increase action with the product ID and quantity
        dispatch(
            increaseProduct({
                productId: productId,
                colorr: colorr,
                quantity: 1,
            }),
        )
    }
    const decreaseQuantity = (productId, colorr) => {
        // Dispatch the increase action with the product ID and quantity
        dispatch(
            decreaseProduct({
                productId: productId,
                colorr: colorr,
                quantity: 1,
            }),
        )
    }
    return (
        <div className=" h-full ">
            {/* LIST ITEM IN CART */}
            <div className="max-h-[72%] w-full  overflow-auto  scroll">
                {/* ITEMS */}

                {cartItem.map((data, index) => (
                    <div
                        onClick={() =>
                            navigate(`/infoProduct/${data.products.id}`)
                        }
                        key={index}
                        className="relative p-6 flex group"
                    >
                        <div className="h-[80px] w-[80px]">
                            <img
                                className="h-full w-full object-cover"
                                src={data.imgChoosed}
                                alt=""
                            />
                        </div>
                        <div className="ml-7 text-[17px] flex flex-col">
                            <span>{data.products.title}</span>
                            <span>{data.products.price} VND</span>
                            <span
                                className="mt-2 border border-black  justify-between max-w-[100px] flex items-center"
                                style={{ zIndex: 1 }}
                            >
                                <button
                                    className={`px-3 py-1  ${
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
                                <div>{data.quantity}</div>
                                <button
                                    className="px-3 py-1  "
                                    // onClick={increaseQuantity}
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
                        </div>

                        <div className="absolute right-4 top-0 h-full w-full flex justify-end items-center">
                            <div className=" opacity-0 group-hover:opacity-100  cursor-pointer p-1 ">
                                <Clear />
                            </div>
                        </div>
                    </div>
                ))}
                <hr className="w-5/6 mx-auto h-px border-0 bg-gray-400" />
            </div>

            {/* TOTAL COST */}
            <div className="absolute right-0  bottom-0 z-50 text-2xl  w-full text-center">
                <div className="p-4 bg-white  border-t-2 border text-3xl font-bold">
                    Tổng Tiền : <span>{allTotal} VND</span>
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
