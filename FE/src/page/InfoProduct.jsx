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
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function InfoProduct() {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [dataInfo, setDataInfo] = useState([])
    const [mainImg, setMainImg] = useState() //MAIN IMG

    // USESTATE OPEN OVERLAY PIC
    const [openPic, setOpenPic] = useState(false)
    const [bigPic, setBigPic] = useState()
    console.log('bigPic', bigPic)

    // CONCAC LIST IMG
    const [arrayImg, setArrayImg] = useState([])
    const test1 = arrayImg.map(img => {
        return img
    })
    console.log('test1', test1)
    const alllist = [].concat(...test1)
    console.log('alllist', alllist)

    // HANLE OVERLAY SLIDE LEFT RIGHT
    const [currentIndexImg, setCurrentIndexImg] = useState(0)
    console.log('currentIndexImg click to small pic', currentIndexImg)
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
        setMainImg(imgItem)
        console.log('imgSrc=', imgItem)
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

    return (
        <div>
            <Navbar />
            <div className=" w-10/11  sm:w-full mt-28  p-7">
                <div className="max-w-5xl mx-auto  flex flex-col">
                    <div className="hidden sm:flex justify-between mb-7">
                        <div>
                            <span className="font-medium">Trang chủ /</span>
                            <span>{dataInfo.title} </span>
                        </div>
                        <span className="pr-5">
                            <ArrowLeftOutlined className="text-xl" /> Trước |
                            Tiếp <ArrowRight className="text-xl" />
                        </span>
                    </div>
                    <div className="relative flex flex-col space-y-4  sm:space-x-4 sm:flex-row ">
                        {/*MAIN PIC*/}
                        <div className="sm:w-1/2 flex flex-col">
                            <div className="sm:h-124 sm:w-124">
                                <img
                                    src={mainImg || alllist[0]}
                                    onClick={() => handleOpenPic(mainImg)}
                                    alt=""
                                />
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
                                    <div className="font-medium">Màu</div>
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
                                                                className="h-4 w-4 rounded-xl border-gray-300 border-2 "
                                                                style={{
                                                                    backgroundColor: `${takeColor.color}`,
                                                                }}
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
                                    />
                                </div>
                            </div>
                            {/* BTN BUY */}
                            <div className="flex flex-col w-full space-y-3 ">
                                <div className="flex">
                                    <button className="bg-white border-2 border-black flex-1  p-3 sm:p-0">
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
                                des={
                                    'Tôi là chi tiết sản phẩm. Tôi là nơi tuyệt vời để bổ sung chi tiết về sản phẩm của bạn như định cỡ, chất liệu, hướng dẫn chăm sóc và làm sạch. Đây cũng là nơi tuyệt vời để nói về điều làm cho sản phẩm này đặc biệt và khách hàng có thể hưởng lợi gì từ nó.'
                                }
                                title={'THÔNG TIN SẢN PHẨM'}
                                plus={'+'}
                            />
                            <hr className="w-full h-1 bg-gray-500" />
                            <ToggleInfoDes
                                des={
                                    'Tôi là chính sách Trả hàng và Hoàn tiền. Tôi là nơi tuyệt vời để cho khách hàng biết phải làm gì nếu họ không hài lòng với giao dịch mua. Có chính sách hoàn tiền hoặc đổi hàng rõ ràng là cách tuyệt vời để xây dựng lòng tin và trấn an khách hàng rằng họ có thể tự tin mua hàng.'
                                }
                                title={'CS TRẢ HÀNG & HOÀN TIỀN'}
                            />
                            <hr className="w-full h-1 bg-gray-500" />
                            <ToggleInfoDes
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
                                <div className=" h-full overflow-hidden">
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
