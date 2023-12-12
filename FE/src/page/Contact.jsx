import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import emailjs from 'emailjs-com'

export default function Contact() {
    const formRef = useRef()
    const [done, setDone] = useState(false)

    const [formData, setFormData] = useState({
        user_name: '',
        user_lastname: '',
        user_email: '',
        message: '',
        user_phone: '',
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        emailjs
            .sendForm(
                'service_rmtothf',
                'template_93u5x3k',
                formRef.current,
                'KW14YvG3abeq6JYLL',
            )
            .then(
                result => {
                    setDone(true)
                    // Clear the form after submission
                    setFormData({
                        user_name: '',
                        user_lastname: '',
                        user_email: '',
                        message: '',
                        user_phone: '',
                    })
                },
                error => {
                    console.log(error.text)
                },
            )
    }

    return (
        <div>
            <Navbar />
            <div className="mt-[104px] p-4 sm:p-0">
                <div className="max-w-md sm:max-w-3xl  mx-auto py-10">
                    <div className="flex flex-col text-center items-center  ">
                        <div className="text-4xl font-bold">Liên Hệ</div>
                        <div className=" text-xl flex flex-col items-center my-10 ">
                            <div>
                                Hãy liên hệ chúng tôi nếu có bất cứ câu hỏi nào
                            </div>
                            <div className="flex flex-col sm:flex-row font-bold ">
                                <div> ĐT: 024 3456 7890</div>
                                <div className="mx-4 hidden sm:flex">|</div>
                                <div>lienhe@web.com</div>
                            </div>
                        </div>
                    </div>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        action=""
                        className=" space-y-5 italic text-xl"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="">Tên*</label>
                            <input
                                type="text"
                                className=" border-2 border-black px-4 focus:outline-none focus:border-4 focus:border-green-400  uppercase "
                                required
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Họ</label>
                            <input
                                type="text"
                                className=" border-2 border-black px-4 focus:outline-none focus:border-4 focus:border-green-400  uppercase "
                                name="user_lastname"
                                value={formData.user_lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Email*</label>
                            <input
                                required
                                type="email"
                                className=" border-2 border-black px-4 focus:outline-none focus:border-4 focus:border-green-400  "
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Điện thoại</label>
                            <input
                                type="text"
                                className=" border-2 border-black px-4 focus:outline-none focus:border-4 focus:border-green-400  "
                                name="user_phone"
                                value={formData.user_phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Tin nhắn*</label>
                            <textarea
                                required
                                name="message"
                                cols="20"
                                rows="5"
                                className=" border-2 border-black px-4 focus:outline-none focus:border-4 focus:border-green-400  "
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="w-full text-right">
                            <button className="font-bold w-[150px] p-3 bg-black text-white focus:bg-green-400 focus:border-2 focus:border-black transition-all ">
                                Gửi
                            </button>
                            {done && '  Thank you , I will rely soon <3'}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
