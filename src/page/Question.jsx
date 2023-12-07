import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Copyright from '../components/Copyright'
import ToggleQuestion from '../components/ToggleQuestion'
import { Search } from '@mui/icons-material'

export default function Question() {
    const [openTL, setOpenTL] = useState(true)

    // const [openC, setOpenC] = useState(false)

    const handleOpenTL = () => {
        setOpenTL(true)
        // setOpenC(false)
    }

    const handleOpenC = () => {
        // setOpenC(true)
        setOpenTL(false)
    }

    const [openSearch, setOpenSearch] = useState(false)
    const handleOpenSearch = () => {
        setOpenSearch(true)
    }
    const handleCloseSearch = () => {
        setOpenSearch(false)
    }
    useEffect(() => {
        const handleClickOutside = event => {
            const searchInput = document.getElementById('searchInput')

            if (searchInput && !searchInput.contains(event.target)) {
                setOpenSearch(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        console.log(
            'window',
            document.addEventListener('click', handleClickOutside),
        )

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [openSearch])

    return (
        <div>
            <Navbar />
            <div className="mt-[104px]">
                <div className="max-w-3xl mx-auto py-20 ">
                    <div className=" text-left text-2xl font-bold">Hỏi đáp</div>
                    <div className="relative flex bg-gray-400 p-2">
                        <div className="flex-1 text-center">
                            Câu hỏi thường gặp
                        </div>

                        {openSearch ? (
                            <input
                                type="text"
                                className=" absolute top-0 right-0 w-full h-full border  px-4"
                                placeholder="Nhập"
                            />
                        ) : (
                            <div>
                                <Search onClick={handleOpenSearch} />
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex space-x-6">
                            <div onClick={handleOpenTL}>
                                Thiết lập câu hỏi thường gặp
                            </div>
                            <div onClick={handleOpenC}>Chung</div>
                        </div>

                        {openTL ? (
                            <div>
                                <ToggleQuestion
                                    des={
                                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nobis maxime, eius, ea impedit illo perspiciatis atque expedita cupiditate sit eaque explicabo. Adipisci, architecto ipsam quidem fuga voluptatibus ad optio!'
                                    }
                                    title={'sdjfhkj'}
                                />
                                <hr />
                                <ToggleQuestion
                                    des={
                                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nobis maxime, eius, ea impedit illo perspiciatis atque expedita cupiditate sit eaque explicabo. Adipisci, architecto ipsam quidem fuga voluptatibus ad optio!'
                                    }
                                    title={'sdjfhkj'}
                                />
                                <hr />
                                <ToggleQuestion
                                    des={
                                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nobis maxime, eius, ea impedit illo perspiciatis atque expedita cupiditate sit eaque explicabo. Adipisci, architecto ipsam quidem fuga voluptatibus ad optio!'
                                    }
                                    title={'sdjfhkj'}
                                />
                            </div>
                        ) : (
                            <div>
                                <ToggleQuestion
                                    des={
                                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nobis maxime, eius, ea impedit illo perspiciatis atque expedita cupiditate sit eaque explicabo. Adipisci, architecto ipsam quidem fuga voluptatibus ad optio!'
                                    }
                                    title={'chusngdkfjksdjg'}
                                />
                                <hr />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Contact />
            <Copyright />
        </div>
    )
}
