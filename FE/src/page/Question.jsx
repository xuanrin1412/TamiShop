import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Copyright from '../components/Copyright'
import ToggleQuestion from '../components/ToggleQuestion'
import { Search } from '@mui/icons-material'
import Footer from '../components/Footer'

export default function Question() {
    const [openTL, setOpenTL] = useState(true)
    const [openSearch, setOpenSearch] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [openQuestions, setOpenQuestions] = useState({})

    const handleOpenTL = () => {
        setOpenTL(true)
    }

    const handleOpenC = () => {
        setOpenTL(false)
    }

    const handleOpenSearch = () => {
        setOpenSearch(true)
    }

    const handleSearchInputChange = event => {
        setSearchText(event.target.value)
    }

    const handleToggleQuestion = id => {
        setOpenQuestions(prevOpenQuestions => ({
            ...Object.fromEntries(
                Object.keys(prevOpenQuestions).map(key => [key, false]),
            ),
            [id]: !prevOpenQuestions[id],
        }))
    }

    return (
        <div>
            <Navbar />
            <div id="#hoidap" className="scroll-smooth mt-[104px] p-8 sm:p-0">
                <div className="max-w-3xl mx-auto py-20 ">
                    <div className=" text-left text-4xl font-bold">Hỏi đáp</div>
                    <div className="relative flex p-2 my-8">
                        <div className="flex-1 text-center text-3xl font-bold ">
                            Câu hỏi thường gặp
                        </div>

                        {openSearch ? (
                            <input
                                type="text"
                                className=" absolute top-0 right-0 w-full h-full border  px-4"
                                placeholder="Nhập"
                                onChange={handleSearchInputChange}
                            />
                        ) : (
                            <div>
                                <Search onClick={handleOpenSearch} />
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex space-x-6">
                            {openTL === true ? (
                                <>
                                    <div
                                        className="  text-[#0A75B2] font-medium"
                                        onClick={handleOpenTL}
                                    >
                                        Thiết lập câu hỏi thường gặp
                                    </div>
                                    <div onClick={handleOpenC}>Chung</div>
                                </>
                            ) : (
                                <>
                                    <div onClick={handleOpenTL}>
                                        Thiết lập câu hỏi thường gặp
                                    </div>
                                    <div
                                        className=" text-[#0A75B2] font-medium"
                                        onClick={handleOpenC}
                                    >
                                        Chung
                                    </div>
                                </>
                            )}
                        </div>

                        {openTL ? (
                            <div>
                                <ToggleQuestion
                                    id="question1"
                                    isOpen={openQuestions['question1']}
                                    onToggle={handleToggleQuestion}
                                    searchText={searchText}
                                    title={
                                        'Làm cách nào để thêm câu hỏi và câu trả lời mới?'
                                    }
                                    des1={
                                        'Để thêm một phần FAQ mới, hãy làm theo các bước sau:'
                                    }
                                    des2={
                                        'Bạn có thể chỉnh sửa các FAQ, sắp xếp lại và chọn các danh mục khác bất kỳ lúc nào.'
                                    }
                                    li1={'Nhấp vào nút "Quản lý FAQ"'}
                                    li2={
                                        'Từ bảng điều khiển của trang web, nhấp vào "Thêm mới" và sau đó chọn tùy chọn "Hỏi và đáp"'
                                    }
                                    li3={
                                        'Mỗi câu hỏi và câu trả lời mới phải được gán cho một danh mục '
                                    }
                                    li4={'Lưu và xuất bản.'}
                                />
                                <hr />
                                <ToggleQuestion
                                    id="question2"
                                    isOpen={openQuestions['question2']}
                                    onToggle={handleToggleQuestion}
                                    searchText={searchText}
                                    title={
                                        'Tôi có thể chèn hình ảnh, video hoặc gif vào FAQ không?'
                                    }
                                    des1={
                                        'Để thêm một phần FAQ mới, hãy làm theo các bước sau:'
                                    }
                                    des2={
                                        'Bạn có thể chỉnh sửa các FAQ, sắp xếp lại và chọn các danh mục khác bất kỳ lúc nào.'
                                    }
                                    li1={'Nhấp vào nút "Quản lý FAQ"'}
                                    li2={
                                        'Từ bảng điều khiển của trang web, nhấp vào "Thêm mới" và sau đó chọn tùy chọn "Hỏi và đáp"'
                                    }
                                    li3={
                                        'Mỗi câu hỏi và câu trả lời mới phải được gán cho một danh mục '
                                    }
                                    li4={'Lưu và xuất bản.'}
                                />
                                <hr />
                                <ToggleQuestion
                                    id="question3"
                                    isOpen={openQuestions['question3']}
                                    onToggle={handleToggleQuestion}
                                    searchText={searchText}
                                    title={
                                        'Làm cách nào để chỉnh sửa hoặc xóa tiêu đề "FAQ"?'
                                    }
                                    des1={
                                        'Để thêm một phần FAQ mới, hãy làm theo các bước sau:'
                                    }
                                    des2={
                                        'Bạn có thể chỉnh sửa các FAQ, sắp xếp lại và chọn các danh mục khác bất kỳ lúc nào.'
                                    }
                                    li1={'Nhấp vào nút "Quản lý FAQ"'}
                                    li2={
                                        'Từ bảng điều khiển của trang web, nhấp vào "Thêm mới" và sau đó chọn tùy chọn "Hỏi và đáp"'
                                    }
                                    li3={
                                        'Mỗi câu hỏi và câu trả lời mới phải được gán cho một danh mục '
                                    }
                                    li4={'Lưu và xuất bản.'}
                                />
                            </div>
                        ) : (
                            <div>
                                <ToggleQuestion
                                    id="question4"
                                    isOpen={openQuestions['question4']}
                                    onToggle={handleToggleQuestion}
                                    searchText={searchText}
                                    des1={
                                        "Phần FAQ thường được dùng để trả lời nhanh các câu hỏi thường gặp về doanh nghiệp của bạn như 'Bạn vận chuyển tới đâu?', 'Giờ mở cửa của bạn?' hoặc 'Tôi có thể đặt dịch vụ thế nào?.' "
                                    }
                                    des2={
                                        'FAQ là cách tuyệt vời để giúp khách truy cập điều hướng trang web của bạn và thậm chí có thể giúp tăng cường SEO cho trang web.'
                                    }
                                    title={
                                        'Phần Câu hỏi thường gặp (FAQ) là gì?'
                                    }
                                    imgP={
                                        'https://static.wixstatic.com/media/452dfd_cebd1429c8454ae9a61bf85247a07391~mv2.jpeg/v1/fill/w_394,h_224,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/452dfd_cebd1429c8454ae9a61bf85247a07391~mv2.jpeg'
                                    }
                                />
                                <hr />
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
