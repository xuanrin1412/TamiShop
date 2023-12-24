import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Copyright from '../components/Copyright'
import {
    ArrowBackIos,
    ArrowForwardIos,
    ArrowLeftOutlined,
    ArrowRight,
    Close,
    Favorite,
} from '@mui/icons-material'
import ToggleInfoDes from '../components/ToggleInfoDes'
import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUserCartProduct } from '../redux/cartSlice'

export default function InfoProduct() {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [dataInfo, setDataInfo] = useState([])
    const navigate = useNavigate()
    console.log('######## INFOPRODUCT PAGE ##########')
    const [mainImg, setMainImg] = useState() //MAIN IMG
    const dispatch = useDispatch()

    // USESTATE OPEN OVERLAY PIC
    const [openPic, setOpenPic] = useState(false)
    const [bigPic, setBigPic] = useState()

    // CONCAC LIST IMG
    const [arrayImg, setArrayImg] = useState([])
    const test1 = arrayImg.map(img => {
        return img
    })
    const alllist = [].concat(...test1)

    // HANLE OVERLAY SLIDE LEFT RIGHT
    const [currentIndexImg, setCurrentIndexImg] = useState(0)
    const handleLeftRight = type => {
        if (type === 'left') {
            setCurrentIndexImg(prevIndex =>
                prevIndex < 1 ? alllist.length - 1 : prevIndex - 1,
            )
        } else if (type === 'right') {
            setCurrentIndexImg(prevIndex =>
                prevIndex === alllist.length - 1 ? 0 : prevIndex + 1,
            )
        }
    }

    // HANLDE WHEN CLICK SUB IMG => TO MAIN IMG
    const handleSubImgClick = imgItem => {
        // // Find the color corresponding to the clicked image
        // const clickedColor = dataInfo.colorimg.find(color =>
        //     color.img.includes(imgItem),
        // )

        // // Update selectedColor state
        // setSelectedColor({
        //     color: clickedColor ? clickedColor.color : null,
        //     img: clickedColor ? [imgItem] : [],
        // })
        console.log('Clicked on sub-image:', imgItem)
        setMainImg(imgItem)
        console.log('Main image set to:', imgItem)
    }

    //HANDLE OPEN CLOSE OVERLAY IMG
    const handleOpenPic = mainImg => {
        setBigPic(mainImg) //mainimg
        setOpenPic(!openPic)
        console.log('setBigPic', setBigPic(mainImg))
    }
    const handleClosePic = () => {
        setOpenPic(!openPic)
    }

    // HANDLE CLICK COLOR ICON
    const [selectedColor, setSelectedColor] = useState({ color: null, img: [] })
    console.log('selectedColor', selectedColor)

    const imgchoosed = selectedColor.img[0]
    const colorchoosed = selectedColor.color

    const [activeColors, setActiveColors] = useState({})
    const handleColorClick = choosedColor => {
        //****/ handle click color active color
        const newActiveColors = {}
        // Activate the clicked color
        newActiveColors[choosedColor.color] = true
        // Deactivate all other colors
        dataInfo.colorimg.forEach(takeColor => {
            if (takeColor.color !== choosedColor.color) {
                newActiveColors[takeColor.color] = false
            }
        })
        setActiveColors(newActiveColors)

        //****/ handle click color show img
        setSelectedColor({
            color: choosedColor.color,
            img: choosedColor.img.length > 0 ? [choosedColor.img[0]] : [],
        })
        setMainImg(
            choosedColor.img.length > 0 ? choosedColor.img[0] : alllist[0],
        )
    }

    // HANDLE OPEN TEXT
    const [openTexts, setOpenTexts] = useState({})
    const handleToggleText = id => {
        setOpenTexts(prevOpenTexts => ({
            ...Object.fromEntries(
                Object.keys(prevOpenTexts).map(key => [key, false]),
            ),
            [id]: !prevOpenTexts[id],
        }))
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                await axios
                    .get(`http://localhost:8080/bag/getone/${id}`)
                    .then(response => {
                        setDataInfo(response.data.getOneBag)
                        setMainImg(
                            response.data.getOneBag.colorimg &&
                                response.data.getOneBag.colorimg.length > 0
                                ? response.data.getOneBag.colorimg[0].img[0]
                                : '',
                        )

                        setArrayImg(
                            response.data.getOneBag.colorimg.map(takeimg =>
                                takeimg.img.map(final => final),
                            ),
                        )
                    })
            } catch (error) {
                console.log(error, "Can't get API")
            }
        }
        getProduct()
    }, [id, bigPic])

    const [quantity, setQuantity] = useState(1)
    console.log('quanlityinfo', quantity)

    const handleAddToCart = async () => {
        if (colorchoosed === null) {
            const elements = document.getElementsByClassName('color')
            // Loop through each element and set the style
            for (const element of elements) {
                element.innerHTML = 'Hãy chọn màu !!'
                element.style.color = 'red'
            }
        } else {
            const elements = document.getElementsByClassName('color')
            // Loop through each element and set the style
            for (const element of elements) {
                element.innerHTML = ''
                element.style.color = ''
            }
            await axios
                .post(
                    `http://localhost:8080/product_cart/addToCart/`,
                    {
                        color: colorchoosed,
                        img: imgchoosed,
                        quantity: quantity,
                        bagId: id,
                        total: quantity * dataInfo.price,
                    },
                    { withCredentials: true },
                )
                .then(response => {
                    console.log('response add to cart ', response)
                    if (response.data.message === "You haven't login") {
                        navigate('/login')
                    }
                })
                .catch(error => {
                    console.log(error, "Can't add to cart")
                })
            dispatch(fetchUserCartProduct())
            setSelectedColor({ color: null, img: [] })
        }
    }

    return (
        <div>
            <Navbar />
            <div className=" w-10/11  sm:w-full mt-28  p-7">
                <div className="max-w-5xl mx-auto  flex flex-col">
                    <div className="hidden sm:flex justify-between mb-7">
                        <div>
                            <Link to={'/'}>
                                <span className="font-medium">
                                    Trang chủ /{' '}
                                </span>
                            </Link>

                            <span className="text-gray-500">
                                {dataInfo.title}
                            </span>
                        </div>
                        <span className="pr-5">
                            <ArrowLeftOutlined className="text-xl" /> Trước |
                            Tiếp <ArrowRight className="text-xl" />
                        </span>
                    </div>
                    <div className="relative flex flex-col space-y-4  sm:space-x-4 sm:flex-row ">
                        {/*MAIN PIC*/}
                        <div className="sm:w-1/2 flex flex-col">
                            <div className="relative top-0 left-0 sm:h-124 sm:w-124 cursor-pointer hover: ">
                                <div>
                                    <img
                                        src={
                                            (selectedColor.img.length > 0 &&
                                                selectedColor.img[0]) ||
                                            mainImg ||
                                            alllist[0]
                                        }
                                        alt=""
                                    />
                                </div>
                                <div
                                    onClick={() => handleOpenPic(mainImg)}
                                    className=" absolute top-0 left-0 flex items-center justify-center w-full h-full bg-transparent2 opacity-0 hover:opacity-100 "
                                >
                                    <h2 className=" textShadow font-medium text-black text-2xl">
                                        Click to Zoom in
                                    </h2>
                                </div>
                            </div>
                            {/*SMALL PIC */}
                            <div className="flex">
                                <div className="hidden sm:flex p-5 space-x-6">
                                    {alllist.map((imgItem, index) => (
                                        <div
                                            key={index}
                                            className="h-16 w-16 border object-cover"
                                            onClick={() =>
                                                handleSubImgClick(imgItem)
                                            }
                                        >
                                            <img src={imgItem} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* PHONE DOT */}
                            <div className="sm:hidden mt-[40px] mb-[20px] flex justify-center space-x-6">
                                {alllist.map((imgItem, index) => (
                                    <span
                                        onClick={() =>
                                            handleSubImgClick(imgItem)
                                        }
                                        key={index}
                                        className={
                                            imgItem === mainImg
                                                ? 'h-[15px] w-[15px]  rounded-full  bg-black'
                                                : 'h-[15px] w-[15px]  rounded-full bg-gray-300'
                                        }
                                    ></span>
                                ))}
                            </div>
                            <div className="font-medium">{dataInfo.des}</div>
                        </div>
                        {/*RIGHT INFO*/}
                        <div className="sm:w-1/2  sm:px-5">
                            {/* INFO ITEM */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1 className="text-3xl">
                                        {dataInfo.title}
                                    </h1>
                                    <div className="  sm:hidden bg-gray-200  rounded-full ml-4 p-3 stroke-1 text-white  active:text-red-600">
                                        <Favorite />
                                    </div>
                                </div>

                                <h3>SKU: 0012</h3>
                                <div className="text-3xl font-medium">
                                    {dataInfo.price} VND
                                </div>

                                <div>
                                    <div className="font-medium color">Màu</div>
                                    <div className="flex  space-x-3">
                                        {dataInfo.colorimg &&
                                            dataInfo.colorimg.map(
                                                (takeColor, index) => (
                                                    <div
                                                        key={index}
                                                        className=" my-2"
                                                    >
                                                        {takeColor.color && (
                                                            <div
                                                                className={` h-8 w-8 rounded-full border-gray-300 border-4 hover:border-[#e74c3c] hover:border-3 hover:drop-shadow-lg ${
                                                                    activeColors[
                                                                        takeColor
                                                                            .color
                                                                    ] === true
                                                                        ? 'border-[#e74c3c] border-3 drop-shadow-lg'
                                                                        : ''
                                                                }`}
                                                                style={{
                                                                    backgroundColor: `${takeColor.color}`,
                                                                }}
                                                                onClick={() =>
                                                                    handleColorClick(
                                                                        takeColor,
                                                                    )
                                                                }
                                                            ></div>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Số lượng</div>
                                    <input
                                        className=" border-2 border-gray-400 px-2 my-2 w-20 h-10"
                                        type="number"
                                        placeholder="1"
                                        min="1"
                                        value={+quantity}
                                        onChange={e =>
                                            setQuantity(
                                                parseInt(e.target.value, 10) ||
                                                    0,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            {/* BTN BUY */}
                            <div className="flex flex-col w-full space-y-3 ">
                                <div className="flex">
                                    <button
                                        onClick={() => handleAddToCart()}
                                        className="bg-white border-2 border-black flex-1  p-3 sm:p-0"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                    <div className="hidden sm:block ml-4 p-3 bg-black text-white">
                                        <Favorite />
                                    </div>
                                </div>

                                <button className="bg-black p-3 flex-1 text-white">
                                    Mua ngay
                                </button>
                            </div>

                            <ToggleInfoDes
                                id="text1"
                                isOpen={openTexts['text1']}
                                onToggle={handleToggleText}
                                des={
                                    'Tôi là chi tiết sản phẩm. Tôi là nơi tuyệt vời để bổ sung chi tiết về sản phẩm của bạn như định cỡ, chất liệu, hướng dẫn chăm sóc và làm sạch. Đây cũng là nơi tuyệt vời để nói về điều làm cho sản phẩm này đặc biệt và khách hàng có thể hưởng lợi gì từ nó.'
                                }
                                title={'THÔNG TIN SẢN PHẨM'}
                                plus={'+'}
                            />
                            <hr className="w-full h-1 bg-gray-500" />
                            <ToggleInfoDes
                                id="text2"
                                isOpen={openTexts['text2']}
                                onToggle={handleToggleText}
                                des={
                                    'Tôi là chính sách Trả hàng và Hoàn tiền. Tôi là nơi tuyệt vời để cho khách hàng biết phải làm gì nếu họ không hài lòng với giao dịch mua. Có chính sách hoàn tiền hoặc đổi hàng rõ ràng là cách tuyệt vời để xây dựng lòng tin và trấn an khách hàng rằng họ có thể tự tin mua hàng.'
                                }
                                title={'CS TRẢ HÀNG & HOÀN TIỀN'}
                            />
                            <hr className="w-full h-1 bg-gray-500" />
                            <ToggleInfoDes
                                id="text3"
                                isOpen={openTexts['text3']}
                                onToggle={handleToggleText}
                                des={
                                    'Tôi là chính sách giao hàng. Tôi là một nơi tuyệt vời để cung cấp thêm thông tin về phương thức giao hàng, đóng gói và cước phí. Cung cấp thông tin đơn giản về chính sách giao hàng là cách tuyệt vời để xây dựng lòng tin và trấn an khách hàng rằng họ có thể tự tin mua hàng.'
                                }
                                title={'THÔNG TIN GIAO HÀNG'}
                            />
                        </div>
                    </div>

                    {/* OVERLAY WHEN CLICK MAIN PIC */}
                    {openPic ? (
                        <div className=" fixed pt-10  pb-24 top-20 left-0 flex justify-center items-center sm:flex  min-w-full  h-full  mx-auto bg-transparent ">
                            {/* BUTTON LEFT RIGHT  */}
                            <div className="absolute top-[40%] left-0 flex  justify-between w-full  text-white">
                                <div
                                    className=" ml-3 p-2 rounded-xl hover:bg-gray-200 hover:text-black"
                                    onClick={() => handleLeftRight('left')}
                                >
                                    <ArrowBackIos
                                        style={{
                                            fontSize: '50px',
                                        }}
                                    />
                                </div>
                                <div
                                    className=" mr-3 p-2 rounded-xl hover:bg-gray-200 hover:text-black"
                                    onClick={() => handleLeftRight('right')}
                                >
                                    <ArrowForwardIos
                                        style={{ fontSize: '50px' }}
                                    />
                                </div>
                            </div>
                            {/* CONTAIN IMG SLIDE */}
                            <div className=" max-h-full max-w-1/2  object-cover flex justify-center  bg-pink-500 ">
                                <div className=" sm:h-[440px] h-full overflow-hidden">
                                    {alllist.map((imgg, index) => (
                                        <img
                                            className={
                                                currentIndexImg === index
                                                    ? 'flex h-full w-full'
                                                    : 'hidden'
                                            }
                                            src={
                                                imgg === bigPic ? bigPic : imgg
                                            }
                                            alt=""
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* BUTTON CLOSE */}
                            <div className="absolute top-40 sm:top-10  right-2 sm:right-8 ">
                                <div
                                    className=" p-1 bg-black text-white hover:bg-gray-200  hover:text-black"
                                    onClick={handleClosePic}
                                >
                                    <Close style={{ fontSize: '40px' }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <Footer />
            <Copyright />
        </div>
    )
}
