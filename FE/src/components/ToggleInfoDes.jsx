import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { useState } from 'react'

export default function ToggleInfoDes({ des, title }) {
    const [openInfoItem, setOpenInfoItem] = useState(false)
    const handleOpenItem = () => {
        setOpenInfoItem(!openInfoItem)
    }
    return (
        <div className="">
            <div className="flex justify-between py-4 items-center">
                <div className="">{title}</div>
                <div className="p-5 text-2xl" onClick={handleOpenItem}>
                    {openInfoItem ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
            </div>
            {openInfoItem ? <div className=" mb-4">{des}</div> : ''}
        </div>
    )
}
