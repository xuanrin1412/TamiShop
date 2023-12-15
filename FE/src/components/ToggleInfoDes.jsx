import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { useState } from 'react'

export default function ToggleInfoDes({ des, title, id, isOpen, onToggle }) {
    const [openInfoItem, setOpenInfoItem] = useState(false)
    const handleOpenItem = () => {
        setOpenInfoItem(!openInfoItem)
    }
    return (
        <div onClick={() => onToggle(id)}>
            <div className="">
                {isOpen ? (
                    <div
                        onClick={handleOpenItem}
                        className="flex justify-between py-4 items-center"
                    >
                        <div className="">{title}</div>
                        <div className="p-5 text-2xl">
                            <ArrowDropDown />
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={handleOpenItem}
                        className="flex justify-between py-4 items-center"
                    >
                        <div className="">{title}</div>
                        <div className="p-5 text-2xl">
                            <ArrowDropUp />
                        </div>
                    </div>
                )}
                {isOpen ? <div className=" mb-4">{des}</div> : ''}
            </div>
        </div>
    )
}
