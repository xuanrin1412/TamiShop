import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchTotalAll, fetchUserCartProduct } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'

export default function ProductMain() {
    console.log('#### HOME PRODUCT MAIN PAGE #######')
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(data)
    useEffect(() => {
        axios
            .get('http://localhost:8080/bag/get/')
            .then(response => {
                setData(response.data.getBag)
            })
            .catch(error => {
                console.error('Error fetching Featured products:', error)
            })
    }, [])

    const handleAddToCart = async id => {
        console.log('handleAddToCart#### HOME PRODUCT MAIN PAGE #######')
        const selectedItem = data.find(item => item.id === id)
        if (!selectedItem) {
            console.error('Product not found')
            return
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/product_cart/addToCart/`,
                {
                    color: selectedItem.colorimg[0].color,
                    img: selectedItem.colorimg[0].img[0],
                    quantity: 1,
                    bagId: id,
                    total: 1 * selectedItem.price,
                },
                { withCredentials: true },
            )
            console.log('response add to cart ', response)
            if (response.data.message === "You haven't login") {
                navigate('/login')
            }
        } catch (error) {
            console.error("Can't add to cart", error)
        }
        dispatch(fetchUserCartProduct())
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

    return (
        <div
            id="cuahang"
            className=" w-full  p-4 flex flex-wrap  mt-[104px] scroll-mt-[104px]"
        >
            {/* ITEM MAIN */}
            {data.map((dataItem, index) => (
                <div
                    key={dataItem.id}
                    className=" flex w-full  md:w-1/3 lg:w-1/4  items-center flex-col group relative p-4"
                >
                    <div className=" w-full h-[260px] relative top-0 left-0">
                        <div className="h-[260px] ">
                            <img
                                className="h-full w-full object-cover bg-center "
                                src={dataItem.colorimg[0].img[0]}
                                alt=""
                            />
                            <img
                                className="h-full w-full object-cover bg-center absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                src={dataItem.colorimg[0].img[1]} // Replace with the URL of the other image
                                alt=""
                            />
                        </div>

                        {dataItem.bestseller && dataItem.bestseller === true ? (
                            <div className="absolute top-0 left-0 bg-black text-white px-2 text-[15px] font-medium">
                                Bán chạy
                            </div>
                        ) : (
                            ''
                        )}

                        <Link to={`/infoProduct/${dataItem.id}`}>
                            <div
                                className="absolute bottom-0 left-0 bg-black-rgba p-3 w-full text-center duration-300 
                   translate-y-full opacity-0 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 "
                            >
                                Xem Chi Tiết
                            </div>
                        </Link>
                    </div>

                    <div className=" w-full text-center font-medium">
                        <h3 className="p-3">{dataItem.title}</h3>
                        <h3>---</h3>
                        <h3 className="py-3">{dataItem.price} VND</h3>
                        <button
                            onClick={() => handleAddToCart(dataItem.id)}
                            className="p-3 bg-black text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
