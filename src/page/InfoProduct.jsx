import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Copyright from '../components/Copyright'
import { ArrowLeftOutlined, ArrowRight, Favorite } from '@mui/icons-material'
import ToggleInfoDes from '../components/ToggleInfoDes'

export default function InfoProduct() {
    return (
        <div>
            <Navbar />
            <div className=" w-full mt-28  p-7">
                <div className="max-w-5xl mx-auto  flex flex-col">
                    <div className="flex justify-between mb-7">
                        <div>
                            <span className="font-medium">Trang chủ /</span>
                            <span>Tôi là sản phẩm </span>
                        </div>
                        <span className="pr-5">
                            <ArrowLeftOutlined className="text-xl" /> Trước |
                            Tiếp <ArrowRight className="text-xl" />
                        </span>
                    </div>
                    <div className="flex space-x-4 ">
                        {/*LEFT*/}
                        <div className="w-1/2 flex flex-col">
                            <div className=" h-124   w-124">
                                <img
                                    src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_675,h_675,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="flex p-5 space-x-6">
                                <div className="h-16 w-16 border  object-cover">
                                    <img
                                        src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_675,h_675,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="h-16 w-16 border object-cover">
                                    <img
                                        src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_675,h_675,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="h-16 w-16 border object-cover">
                                    <img
                                        src="https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_675,h_675,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="font-medium">
                                Tôi là mô tả sản phẩm. Tôi là nơi tuyệt vời để
                                bổ sung thông tin chi tiết về sản phẩm như định
                                cỡ, chất liệu, hướng dẫn chăm sóc và làm sạch.
                            </div>
                        </div>
                        {/*RIGHT*/}
                        <div className="w-1/2  px-5">
                            {/* INFO ITEM */}
                            <div className="space-y-4">
                                <h1 className="text-3xl">Tôi là sản phẩm </h1>
                                <h3>SKU: 0012</h3>
                                <div className="text-3xl font-medium">
                                    300.000đ
                                </div>
                                <div>
                                    <div className="font-medium">Màu</div>
                                    <div className="flex space-x-2 my-2">
                                        <div className="h-4 w-4 bg-orange-500 rounded-xl"></div>
                                        <div className="h-4 w-4 bg-pink-500 rounded-xl"></div>
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
                                    <button className="bg-white border-2 border-black flex-1 ">
                                        Thêm vào giỏ hàng
                                    </button>
                                    <div className="ml-4 p-3 bg-black text-white">
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
                </div>
            </div>
            <Contact />
            <Copyright />
        </div>
    )
}
