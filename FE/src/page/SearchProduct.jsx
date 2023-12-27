import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Copyright from '../components/Copyright'
import Footer from '../components/Footer'
import { Clear, Search } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchTotalAll, fetchUserCartProduct } from '../redux/cartSlice'

export default function SearchProduct(props) {
    console.log('SEARCH PRODUCT====================')

    // 2 HEAD RANGE

    // HANDLE PRICE 2 HEAD SLIDER
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(500000) // Điều chỉnh giá trị mặc định tùy vào nhu cầu của bạn
    const [value, setValue] = useState([minPrice, maxPrice]) // Use minPrice and maxPrice as initial values for the Slider
    const handleChange = (event, newValue) => {
        setValue(newValue)
        setMinPrice(newValue[0])
        setMaxPrice(newValue[1])
    }

    // HANDLE SEARCH INPUT
    const textSearchRedux = useSelector(state => state.Cart.textSearch)
    const [textSearchP, setTextSearchP] = useState(textSearchRedux)

    useEffect(() => {
        // Update local state when Redux state changes
        setTextSearchP(textSearchRedux)
    }, [textSearchRedux])

    // TAKE OUT BAG DATA
    const [data, setData] = useState([])
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

    // FILTER PRODUCT BASE ON TEXTSEARCH
    const filteredData = data
        .filter(dataItem =>
            dataItem.title.toLowerCase().includes(textSearchP.toLowerCase()),
        )
        .filter(dataItem => {
            const itemPrice = dataItem.price
            return (
                itemPrice >= Number(minPrice) && itemPrice <= Number(maxPrice)
            )
        })

    console.log('filteredData', filteredData)

    // HIGHTLIGHT TEXT SEARC HED
    const highlightSearchTerm = (title, searchTerm) => {
        const lowerTitle = title.toLowerCase()
        const lowerSearchTerm = searchTerm.toLowerCase()
        const index = lowerTitle.indexOf(lowerSearchTerm)
        if (index !== -1) {
            return (
                <>
                    {title.substring(0, index)}
                    <span className="font-bold bg-yellow-200">
                        {title.substring(index, index + searchTerm.length)}
                    </span>
                    {title.substring(index + searchTerm.length)}
                </>
            )
        }
        return title
    }

    // HANDLE ADD TO CART
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
        dispatch(fetchTotalAll())
    }

    // HANDLE SORT PRICE
    const [sortOption, setSortOption] = useState('phuhopnhat')
    const handleSortChange = sort => {
        setSortOption(sort)
    }
    if (sortOption === 'thapdencao') {
        filteredData.sort((product1, product2) => {
            return product1.price - product2.price
        })
    } else if (sortOption === 'caodenthap') {
        // Sắp xếp giảm dần
        filteredData.sort((product1, product2) => {
            return product2.price - product1.price
        })
    }

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="mt-[104px]">
                <div className=" w-3/4 py-10 mx-auto ">
                    <div className="text-center text-4xl font-bold">
                        Kết quả tìm kiếm
                    </div>
                    <div className=" my-5 w-2/3 mx-auto  flex items-center border border-black ">
                        <div className="px-[10px]">
                            <Search />
                        </div>
                        <input
                            className="flex-1 p-2 text-xl outline-none "
                            value={textSearchP}
                            onChange={e => setTextSearchP(e.target.value)}
                            type="text"
                        />
                        <div className="px-[10px]">
                            <Clear
                                className=" opacity-100 hover:opacity-50 cursor-pointer"
                                onClick={() => setTextSearchP('')}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center ">
                        <div>
                            {/* <div>price</div> */}
                            {/* <Box sx={{ width: 200 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    min={0} // Set the min property for the Slider
                                    max={500000}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    // getAriaValueText={valuetext}
                                />
                            </Box> */}
                            <TextField
                                label="Giá tối thiểu"
                                type="number"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                            />
                            <TextField
                                label="Giá tối đa"
                                type="number"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                            />
                        </div>
                        {textSearchP && (
                            <div className=" underline">
                                Đã tìm thấy <span>{filteredData.length}</span>{' '}
                                sản phẩm cho{' '}
                                <span className="font-bold">
                                    "{textSearchP}"
                                </span>
                            </div>
                        )}
                        <div className="flex">
                            Sắp xếp theo :
                            <select
                                onChange={e => handleSortChange(e.target.value)}
                            >
                                <option value="phuhopnhat">Phù hợp nhất</option>
                                <option value="thapdencao">Giá (Tăng)</option>
                                <option value="caodenthap">Giá (Giảm)</option>
                            </select>
                        </div>
                    </div>
                    <div className=" w-full  flex flex-wrap ">
                        {filteredData.map((dataItem, index) => (
                            <div
                                key={dataItem.id}
                                className=" flex w-full  md:w-1/3 lg:w-1/4  items-center flex-col group relative p-4"
                            >
                                <div className=" w-full h-[202px]  relative top-0 left-0">
                                    <img
                                        className="h-full w-full object-cover bg-center "
                                        src={dataItem.colorimg[0].img[0]}
                                        alt=""
                                    />
                                </div>

                                <div className=" w-full text-center font-medium">
                                    <Link
                                        to={`/infoProduct/${dataItem.id}`}
                                        className=" underline"
                                    >
                                        <div className="p-2 text-[19px]">
                                            {highlightSearchTerm(
                                                dataItem.title,
                                                textSearchP,
                                            )}
                                        </div>
                                    </Link>

                                    <h3 className="pb-2 text-[18px] font-bold">
                                        {dataItem.price} VND
                                    </h3>
                                    <button
                                        onClick={() =>
                                            handleAddToCart(dataItem.id)
                                        }
                                        className="w-full p-3 bg-black text-white mb-2 "
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredData.length < 1 && (
                            <div className="w-full flex justify-center text-xl font-bold  text-red-500">
                                Sản phẩm không tồn tại !!!
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </div>
    )
}
