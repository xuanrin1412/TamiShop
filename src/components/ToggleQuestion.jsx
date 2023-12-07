import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { useState } from 'react'

export default function ToggleQuestion({ des, title }) {
    const [openInfoItem, setOpenInfoItem] = useState(false)
    const handleOpenItem = () => {
        setOpenInfoItem(!openInfoItem)

        console.log(openInfoItem)
    }
    return (
        <div className="">
            <div className="flex justify-between py-4 items-center">
                <div className="">{title}</div>
                <div className="p-2 text-2xl" onClick={handleOpenItem}>
                    {openInfoItem ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
            </div>
            {openInfoItem ? <div className=" mb-1">{des}</div> : ''}
        </div>
    )
}
