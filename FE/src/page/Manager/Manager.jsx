import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { Clear } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Navbar from '../../components/Navbar'

export default function Manager() {
    const [data, setData] = useState([])
    console.log('data', data)
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

    //=============== HANDLE FORM CREATE BAG ============================================
    // const [isCreateBag, setIsCreateBag] = useState(false)
    const [openOverlay, setOpenOverlay] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    console.log('isUpdate', isUpdate)
    // console.log('isCreateBag', isUpdate)
    const handleOpenOverlay = controlModel => {
        setOpenOverlay(true)
        setIsUpdate(controlModel)
    }
    const handleCloseOverlay = () => {
        setOpenOverlay(false)

        resetForm()
    }
    const init = {
        title: '',
        price: 0,
        des: '',
        colorimg: [{ color: '', img: [] }],
        bestseller: false,
    }

    const [formData, setFormData] = useState(init)
    const resetForm = () => {
        setFormData(init)
    }
    console.log('formData', formData)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === 'price' ? parseFloat(value) : value,
        })
    }

    const handleColorChange = (e, index) => {
        const { name, value } = e.target
        const updatedColorImg = [...formData.colorimg]
        updatedColorImg[index] = { ...updatedColorImg[index], [name]: value }
        console.log(updatedColorImg[index])
        setFormData({
            ...formData,
            colorimg: updatedColorImg,
        })
    }

    const handleImgChange = (e, colorIndex, imgIndex) => {
        const { value } = e.target
        const updatedColorImg = [...formData.colorimg]
        updatedColorImg[colorIndex].img[imgIndex] = value

        setFormData({
            ...formData,
            colorimg: updatedColorImg,
        })
    }

    const addColorAndImg = () => {
        setFormData({
            ...formData,
            colorimg: [...formData.colorimg, { color: '', img: [] }],
        })
    }

    const removeColor = index => {
        const updatedColorImg = [...formData.colorimg]
        updatedColorImg.splice(index, 1)
        setFormData({
            ...formData,
            colorimg: updatedColorImg,
        })
    }

    const addImage = colorIndex => {
        const updatedColorImg = [...formData.colorimg]
        console.log('updatedColorImg', updatedColorImg)
        updatedColorImg[colorIndex].img.push('')
        setFormData({
            ...formData,
            colorimg: updatedColorImg,
        })
    }

    const removeImage = (colorIndex, imgIndex) => {
        const updatedColorImg = [...formData.colorimg]
        updatedColorImg[colorIndex].img.splice(imgIndex, 1)
        setFormData({
            ...formData,
            colorimg: updatedColorImg,
        })
    }

    // =============== HANDLE CREATE BAG ================================================
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            // Make the POST request
            await axios.post(
                'http://localhost:8080/bag/create/',
                {
                    title: formData.title,
                    price: formData.price,
                    des: formData.des,
                    color: formData.color,
                    colorimg: formData.colorimg,
                    bestseller: formData.bestseller,
                },
                { withCredentials: true },
            )

            // Fetch the updated list of products
            const updatedProducts = await axios.get(
                'http://localhost:8080/bag/get/',
            )

            setData(updatedProducts.data.getBag)

            handleCloseOverlay()
            resetForm()
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    //=============== HANDLE DELETE ONE PRODUCT =========================================
    const [idDelete, setIdDelete] = useState(null)
    console.log('idDelete', idDelete)
    const [openNotiDelete, setOpenNotiDelete] = useState(false)
    console.log('openNotiDelete', openNotiDelete)

    const handleClose = () => {
        setOpenNotiDelete(false)
    }

    const handleDelete = async () => {
        console.log('handle delete', idDelete)
        try {
            if (idDelete) {
            }
            await axios.delete(`http://localhost:8080/bag/delete/${idDelete}`, {
                withCredentials: true,
            })
            setOpenNotiDelete(false)

            const updatedProducts = await axios.get(
                'http://localhost:8080/bag/get/',
            )
            setData([...updatedProducts.data.getBag]) // Use spread operator to create a new array
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }
    //=============== HANDLE SEE PRODUCT =====================================================
    const [openView, setOpenView] = useState(false)
    console.log('openView', openView)

    const handleCloseView = () => {
        setOpenView(false)
    }
    const [oneProduct, setOneProduct] = useState({})
    console.log('oneProduct', oneProduct)

    const handleView = async id => {
        try {
            setOpenView(true)
            const getOne = await axios.get(
                `http://localhost:8080/bag/getone/${id}`,
                { withCredentials: true },
            )
            console.log('téttttt', getOne.data)

            setOneProduct(getOne.data.getOneBag)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    //=============== HANDLE UPDATE ========================================================
    const [idCurrent, setIdCurrent] = useState(null)

    const handleUpdate = dataUpdateBag => {
        console.log('handleUpdate ======')
        setIsUpdate(true)
        setOpenOverlay(true)
        formData.title = dataUpdateBag.title
        formData.price = dataUpdateBag.price
        formData.des = dataUpdateBag.des
        formData.colorimg = dataUpdateBag.colorimg
        formData.bestseller = dataUpdateBag.bestseller
        setIdCurrent(dataUpdateBag.id)
    }
    // final Update
    const finalUpdate = async () => {
        console.log('finalUpdate ========')
        try {
            await axios
                .put(
                    `http://localhost:8080/bag/update/${idCurrent}`,
                    {
                        title: formData.title,
                        price: formData.price,
                        des: formData.des,
                        colorimg: formData.colorimg,
                        bestseller: formData.bestseller,
                    },
                    { withCredentials: true },
                )
                .then(response => {
                    console.log('response final update', response.data)
                    // setFormData(response)
                    // setProductData(response.data.result)
                    // console.log('res', response.data.result)
                    // setTitle('')
                    // setDesc('')
                    // setImg('')
                    // setColors([])
                    // setCategorys([])
                    // setSizes([])
                    // setPrice(0)
                    setOpenOverlay(false)
                    setIsUpdate(false)
                    // setIsCreateBag(true)
                    resetForm()
                })
            setIdCurrent(null)
            const updatedProducts = await axios.get(
                'http://localhost:8080/bag/get/',
            )
            setData(updatedProducts.data.getBag)
            setIsUpdate(false)
        } catch (error) {
            console.error('Error fetching product data:', error)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="mt-[104px]">
                <div className=" w-full sm:w-3/4 mx-auto py-10  relative">
                    <div className="text-2xl font-bold mb-3 text-center">
                        Sản phẩm (Chỉ Admin mới có quyền Chỉnh sửa ,Thêm , Xóa)
                    </div>
                    <button
                        onClick={() => handleOpenOverlay(false)}
                        className=" border-2 p-2 font-medium  border-black mb-4 hover:bg-black hover:text-white"
                    >
                        Tạo mới sản phẩm
                    </button>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Thông tin sản phẩm</th>
                                <th>Sửa</th>
                                <th>Xem</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dataItem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="flex space-x-4">
                                        <div className="h-[60px] w-[60px]">
                                            <img
                                                src={
                                                    dataItem.colorimg[0].img[0]
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="w-full">
                                                {dataItem.title}{' '}
                                            </div>
                                            <div className=" space-x-1">
                                                <span className=" pr-1">
                                                    color:
                                                </span>
                                                {dataItem.colorimg.map(
                                                    (dataa, index) => (
                                                        <span key={index}>
                                                            {dataa.color},
                                                        </span>
                                                    ),
                                                )}{' '}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        onClick={() => handleUpdate(dataItem)}
                                        className="icon"
                                    >
                                        <AutoFixHighIcon />
                                    </td>
                                    <td
                                        onClick={() => handleView(dataItem.id)}
                                        className="icon"
                                    >
                                        <RemoveRedEyeIcon />
                                    </td>
                                    {/* OVERLAY OPEN VIEW BOX */}
                                    {openView === true && (
                                        <div
                                            onClick={() => handleCloseView()}
                                            className=" fixed top-0 right-0 w-full h-full flex items-center justify-center bg-opacity-[0.05] bg-black "
                                        >
                                            <div className="w-full sm:w-2/3  h-3/4 sm:h-4/5 mt-28 p-7  space-y-4  flex flex-col justify-between bg-white">
                                                <div className="text-center text-xl font-bold px-8 ">
                                                    Chi tiết sản phẩm
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <span className="font-bold">
                                                            Tên Sản Phẩm :
                                                        </span>

                                                        {oneProduct.title}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">
                                                            Giá :
                                                        </span>
                                                        {oneProduct.price}
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={`${
                                                                oneProduct.bestseller ===
                                                                true
                                                                    ? 'flex font-bold '
                                                                    : 'hidden'
                                                            } `}
                                                        >
                                                            Bán chạy
                                                        </span>
                                                    </div>
                                                    <div className="">
                                                        <span className="font-bold">
                                                            Mô tả :
                                                        </span>
                                                        {oneProduct.des}
                                                    </div>
                                                    <div className="flex space-x-9 flex-wrap">
                                                        {oneProduct &&
                                                            oneProduct.colorimg &&
                                                            oneProduct.colorimg.map(
                                                                (
                                                                    colorImg,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className=""
                                                                    >
                                                                        <div>
                                                                            <span className="font-bold">
                                                                                Màu:{' '}
                                                                            </span>
                                                                            {
                                                                                colorImg.color
                                                                            }
                                                                        </div>
                                                                        <div className="flex  flex-wrap">
                                                                            {colorImg.img.map(
                                                                                imgg => (
                                                                                    <div className="h-[150px] w-[150px]">
                                                                                        <img
                                                                                            className="h-full w-full"
                                                                                            src={
                                                                                                imgg
                                                                                            }
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-end">
                                                    <span
                                                        onClick={() =>
                                                            handleCloseView()
                                                        }
                                                        className="p-2 px-4 border  hover:bg-black hover:text-white  "
                                                    >
                                                        Đóng
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <td
                                        onClick={() => {
                                            setOpenNotiDelete(true)
                                            setIdDelete(dataItem.id)
                                            console.log(
                                                'dataItem.id',
                                                dataItem.id,
                                            )
                                        }}
                                        className="icon"
                                    >
                                        <DeleteForeverIcon />
                                    </td>
                                    {/* OVERLAY OPEN DELETE BOX */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* OVERLAY DELETE PRODUCT */}
            {openNotiDelete === true && (
                <div
                    onClick={() => handleClose()}
                    className=" fixed top-0 right-0 w-full h-full flex items-center justify-center bg-opacity-[0.05] bg-black  "
                >
                    <div className=" mt-28 p-7  space-y-4  flex flex-col justify-between bg-white">
                        <div className="text-center text-xl font-bold px-8">
                            Xóa sản phẩm
                        </div>
                        <div className="flex justify-between">
                            <span
                                onClick={() => handleDelete()}
                                className="p-2 px-4 border hover:bg-black hover:text-white "
                            >
                                Yes
                            </span>
                            <span
                                onClick={() => handleClose()}
                                className="p-2 px-4 border  hover:bg-black hover:text-white  "
                            >
                                No
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* OVERLAY ADD FIX PRODUCT */}
            {openOverlay && (
                <div className=" fixed top-0 right-0 w-full h-full flex items-center justify-center bg-transparent">
                    <div className=" relative h-3/4 w-4/5 bg-white mt-28 p-7  space-x-4 flex flex-col sm:justify-between">
                        {isUpdate === true ? (
                            <div className="text-center text-xl font-bold mb-10 sm:mb-0">
                                Chỉnh sửa sản phẩm
                            </div>
                        ) : (
                            <div className="text-center text-xl font-bold mb-10 sm:mb-0">
                                Thêm sản phẩm
                            </div>
                        )}

                        <div>
                            <form
                                // onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row sm:space-x-8"
                            >
                                <div className=" sm:w-1/3">
                                    <div className=" w-full space-y-4">
                                        <div className=" space-x-2 flex">
                                            <label
                                                htmlFor="title"
                                                className=" font-medium"
                                            >
                                                Tên
                                            </label>
                                            <input
                                                className="border-2 border-black flex-1 px-2 "
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={formData.title}
                                                onChange={e => handleChange(e)}
                                            />
                                        </div>
                                        <div className="flex  space-x-2">
                                            <label
                                                htmlFor="title"
                                                className=" font-medium"
                                            >
                                                Giá
                                            </label>
                                            <input
                                                id="title"
                                                type="number"
                                                name="price"
                                                className=" border-2 border-black px-2 flex-1"
                                                value={formData.price}
                                                onChange={e => handleChange(e)}
                                            />
                                        </div>
                                        <div className="flex space-x-2 sm:space-x-0 sm:flex-col w-full sm:space-y-2">
                                            <label
                                                htmlFor="title"
                                                className="font-medium "
                                            >
                                                Mô tả sản phẩm
                                            </label>
                                            <textarea
                                                type="text"
                                                name="des"
                                                className=" flex-1 sm:flex-none  sm:h-[100px]   border-2 border-black px-2"
                                                value={formData.des}
                                                onChange={e => handleChange(e)}
                                            />
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            <label
                                                htmlFor=""
                                                className="font-medium"
                                            >
                                                Bán chạy
                                            </label>
                                            <label
                                                className="relative flex items-center p-3 rounded-full cursor-pointer"
                                                htmlFor="check"
                                            >
                                                {formData.bestseller ? (
                                                    <input
                                                        checked
                                                        type="checkbox"
                                                        className={`  bg-white  before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border-2 border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                                                        id="check"
                                                        value={
                                                            formData.bestseller
                                                        }
                                                        onChange={e =>
                                                            setFormData({
                                                                ...formData,
                                                                bestseller:
                                                                    e.target
                                                                        .checked,
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        className={`  bg-white  before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border-2 border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                                                        id="check"
                                                        value={
                                                            formData.bestseller
                                                        }
                                                        onChange={e =>
                                                            setFormData({
                                                                ...formData,
                                                                bestseller:
                                                                    e.target
                                                                        .checked,
                                                            })
                                                        }
                                                    />
                                                )}

                                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="  sm:w-2/3 imgColor">
                                    <div className="flex flex-col space-y-4 h-[350px] sm:h-[290px] w-full mb-3 overflow-hidden overflow-y-scroll scroll">
                                        {formData.colorimg.map(
                                            (color, colorIndex) => (
                                                <div
                                                    key={colorIndex}
                                                    className="relative"
                                                >
                                                    <div className=" space-x-2">
                                                        <label className=" font-medium">
                                                            Color:
                                                        </label>
                                                        <input
                                                            className=" border-2 border-black px-2 "
                                                            type="text"
                                                            name="color"
                                                            placeholder="Color"
                                                            value={color.color}
                                                            onChange={e =>
                                                                handleColorChange(
                                                                    e,
                                                                    colorIndex,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className=" flex  flex-wrap">
                                                        {color.img.map(
                                                            (img, imgIndex) => (
                                                                <div
                                                                    key={
                                                                        imgIndex
                                                                    }
                                                                    className=" flex px-2  items-center space-x-1  "
                                                                >
                                                                    <input
                                                                        className="w-[100px] my-4 border-2 border-black"
                                                                        type="text"
                                                                        name="img"
                                                                        placeholder="Image URL"
                                                                        value={
                                                                            img
                                                                        }
                                                                        onChange={e =>
                                                                            handleImgChange(
                                                                                e,
                                                                                colorIndex,
                                                                                imgIndex,
                                                                            )
                                                                        }
                                                                    />

                                                                    {img && (
                                                                        <div className="relative   my-3">
                                                                            <div className="h-[50px] w-[50px] border-2 border-black">
                                                                                <img
                                                                                    className="h-full w-full object-cover"
                                                                                    src={
                                                                                        img
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            </div>

                                                                            <button
                                                                                className="absolute top-0 right-0 text-white"
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    removeImage(
                                                                                        colorIndex,
                                                                                        imgIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Clear />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                    <button
                                                        className="bg-gray-400 mt-4 p-[2px] border-2 text-[12px]"
                                                        type="button"
                                                        onClick={() =>
                                                            addImage(colorIndex)
                                                        }
                                                    >
                                                        Add Link Image
                                                    </button>
                                                    <br></br> <br></br>
                                                    <button
                                                        className=" text-[13px] border-2 mr-2 bg-gray-400 absolute right-0 bottom-4"
                                                        type="button"
                                                        onClick={() =>
                                                            removeColor(
                                                                colorIndex,
                                                            )
                                                        }
                                                    >
                                                        Remove Color & All Img
                                                    </button>
                                                    <hr className="border-2 border-black" />
                                                </div>
                                            ),
                                        )}

                                        <span
                                            onClick={addColorAndImg}
                                            // onClick={handleAddMoreImgColor}
                                            title="hello"
                                            className="flex rounded-full p-1 bg-gray-400 text-white justify-start w-fit cursor-pointer"
                                        >
                                            <AddCircleIcon />
                                        </span>
                                    </div>
                                </div>
                            </form>
                            {isUpdate === true ? (
                                <button
                                    type="button"
                                    onClick={() => finalUpdate()}
                                    className=" w-full p-2 bg-black text-white"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className=" w-full p-2 bg-black text-white"
                                >
                                    Tạo
                                </button>
                            )}
                        </div>
                        <div
                            onClick={() => handleCloseOverlay()}
                            className="absolute top-0 right-0 p-2  cursor-pointer"
                        >
                            <Clear style={{ fontSize: '40px' }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
