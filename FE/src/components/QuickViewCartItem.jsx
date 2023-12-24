import { Clear } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDeleteOProduct,
    fetchIncreaseQuantity,
    fetchTotalAll,
    fetchUserCartProduct,
    fetchDecreaseQuantity,
} from '../redux/cartSlice'
import { useEffect } from 'react'

export default function QuickViewCartItem() {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    console.log('id in quick cart ', id)
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.Cart.items.getCart) ?? []
    const totalAll = useSelector(state => state.Cart.totalAll)
    console.log('totalAll', totalAll)
    console.log('cartItems quickcart', cartItems)

    //REMOVE PRODUCT
    const handleRemoveProduct = async (productId, color) => {
        try {
            await dispatch(fetchDeleteOProduct({ productId, color }))
            await dispatch(fetchUserCartProduct())
            await dispatch(fetchTotalAll())
        } catch (error) {
            console.error('Error removing product:', error)
        }
    }
    //INCEASE PRODUCT
    const handleInceaseQuantity = async (productId, color) => {
        try {
            await dispatch(fetchIncreaseQuantity({ productId, color }))
            await dispatch(fetchUserCartProduct())
            await dispatch(fetchTotalAll())
        } catch (error) {
            console.error('Error increasing quantity:', error)
        }
    }
    //DECREASE PRODUCT
    const handleDeceaseQuantity = async (productId, color) => {
        try {
            await dispatch(fetchDecreaseQuantity({ productId, color }))
            await dispatch(fetchUserCartProduct())
            await dispatch(fetchTotalAll())
        } catch (error) {
            console.error('Error decreasing quantity:', error)
        }
    }

    //DISPATCH TO TAKE DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchUserCartProduct())
                await dispatch(fetchTotalAll())
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [dispatch])

    const navigate = useNavigate()

    console.log('#### QUICK CART PAGE #######')

    return (
        <div className=" h-full ">
            {/* LIST ITEM IN CART */}
            <div className="max-h-[59%] w-full  overflow-auto  scroll">
                {/* ITEMS */}
                {cartItems &&
                    cartItems.map((data, index) => (
                        <div
                            onClick={() =>
                                navigate(`/infoProduct/${data.Bag.id}`)
                            }
                            key={data.id}
                            className="relative p-6 flex group"
                        >
                            <div className="h-[80px] w-[80px]">
                                <img
                                    className="h-full w-full object-cover"
                                    src={data.img}
                                    alt=""
                                />
                            </div>
                            <div className="ml-7 text-[17px] flex flex-col">
                                <span>{data.Bag.title}</span>
                                <span>{data.price} VND</span>
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
                                            handleDeceaseQuantity(
                                                data.id,
                                                data.color,
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <div>{data.quantity}</div>
                                    <button
                                        className="px-3 py-1  "
                                        onClick={() =>
                                            handleInceaseQuantity(
                                                data.id,
                                                data.color,
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </span>
                            </div>

                            <div className="absolute right-4 top-0 h-full w-full flex justify-end items-center">
                                <div
                                    onClick={e => {
                                        e.stopPropagation() // Ngăn chặn sự kiện navigate lan tỏa lên phần tử cha
                                        handleRemoveProduct(data.id, data.color)
                                    }}
                                    className=" opacity-0 group-hover:opacity-100  cursor-pointer p-1 "
                                >
                                    <Clear />
                                </div>
                            </div>
                        </div>
                    ))}
                {/* <hr className="w-5/6 mx-auto h-px border-0 bg-gray-400" /> */}
            </div>
            {/* WHEN DONT HAVE PRODUCT IN CART DISPLAY THIS */}
            {cartItems.length === 0 && (
                <div className=" text-center h-full w-full ">
                    <img
                        src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg"
                        alt=""
                    />
                </div>
            )}

            {/* TOTAL COST */}
            <div className="absolute right-0  bottom-0 z-50 text-2xl  w-full text-center">
                <div className="p-4 bg-white  border-t-2 border text-3xl font-bold">
                    Tổng Tiền : <span>{totalAll} VND</span>
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
