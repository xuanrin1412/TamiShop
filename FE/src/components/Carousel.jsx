import React, { useEffect, useState } from 'react'
import pic1 from '../pic/pic1.jpg'
import CarouselItem1 from './CarouselItem/CarouselItem1'
import CarouselItem3 from './CarouselItem/CarouselItem3'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
export default function Carousel() {
    const slides = [
        <CarouselItem3
            img={
                'https://i.pinimg.com/564x/9c/71/79/9c717927dc92de7ec8b887e23699db7d.jpg'
            }
            img1={
                'https://i.pinimg.com/564x/c0/8a/3a/c08a3a3c955ab4dfb56c77496b1e86e8.jpg'
            }
            img2={
                'https://i.pinimg.com/564x/36/c8/8e/36c88e753ba8c9d018bf24ac8fd045af.jpg'
            }
        />,
        <CarouselItem1
            img={pic1}
            img1={
                'https://images.lifestyleasia.com/wp-content/uploads/sites/5/2022/03/25182313/TWIST_HO_YEON_10_PORTE_LV.COM_2000x2000-min.jpg'
            }
        />,
        <CarouselItem3
            img={
                'https://i.pinimg.com/564x/24/99/f8/2499f835afc5dcd0c8b5cacedbe33639.jpg'
            }
            img1={
                'https://i.pinimg.com/564x/ff/64/73/ff64737f53362496f48a8af3ce162329.jpg'
            }
            img2={
                'https://i.pinimg.com/564x/dc/21/fe/dc21fe49138f2aadde7c3af4090ccc14.jpg'
            }
        />,
    ]
    const lastImg = slides.length - 1
    const [currentImg, setCurrentImg] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg(currentImg === lastImg ? 0 : currentImg + 1)
        }, 2500)
        return () => clearInterval(interval)
    }, [currentImg, lastImg])
    const handleLeft = () => {
        setCurrentImg(currentImg === 0 ? lastImg : currentImg - 1)
    }
    const handleRight = () => {
        setCurrentImg(currentImg === lastImg ? 0 : currentImg + 1)
    }
    const onclick = currentImg => {
        setCurrentImg(currentImg)
    }
    return (
        <div className=" relative w-full h-full  flex flex-wrap  mt-[104px] scroll-mt-[104px]">
            {slides[currentImg]}

            <div className=" absolute bottom-10 justify-center flex w-full space-x-3">
                {slides.map((item, index) => (
                    <span
                        key={index}
                        className={` ${
                            index === currentImg
                                ? 'h-3 w-3 bg-black opacity-100 rounded-full'
                                : 'h-3 w-3 bg-gray-300 opacity-60 rounded-full'
                        }`}
                        onClick={() => onclick(index)}
                    ></span>
                ))}
            </div>

            <div className="absolute top-[50%] w-full  flex justify-between">
                <span className="p-2" onClick={() => handleLeft()}>
                    <KeyboardArrowLeftIcon
                        style={{ fontSize: '70px' }}
                        className="hover:text-white hover:bg-gray-300 rounded-full "
                    />
                </span>
                <span className="p-2" onClick={() => handleRight()}>
                    <ChevronRightIcon
                        style={{ fontSize: '70px' }}
                        className="hover:text-white hover:bg-gray-300 rounded-full "
                    />
                </span>
            </div>
        </div>
    )
}
