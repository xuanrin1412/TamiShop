export default function Contact() {
    return (
        <div id="lienhe" className="bg-black text-white">
            <div className=" max-w-4xl mx-auto py-10">
                <div className="flex justify-between  p-14 ">
                    <div className="flex flex-col space-y-2 font-bold text-xl">
                        <div>Giao và trả hàng</div>
                        <div>CS Cửa hàng</div>
                        <div>Phương thức thanh toán</div>
                    </div>
                    <div className="flex flex-col space-y-2 font-bold text-xl">
                        <div>Liên hệ</div>
                        <div>ĐT: 0967016129</div>
                    </div>
                    <div className="flex flex-col space-y-2 font-bold text-xl">
                        <div>Facebook</div>
                        <div>Instagram </div>
                        <div>Twitter</div>
                    </div>
                </div>
                <div className="p-10 text-xl">
                    <h2>
                        Đăng ký nhận thư từ chúng tôi để không bỏ lỡ thông tin
                    </h2>
                    <div className=" mt-3 ">
                        <label for="email">Email</label>
                        <form className="mt-1 flex text-xl">
                            <input
                                className="w-[600px] border-b-2 bg-transparent px-3"
                                type="text"
                                id="email"
                                placeholder="Enter Your Email"
                                required
                            />
                            <button
                                type="submit"
                                className=" ml-10 p-2 bg-white text-black font-bold hover:bg-green-500   transition-duration: 0.5s;"
                            >
                                Đăng kí ngay
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
