import {
    ArrowDropDown,
    ArrowDropUp,
    Facebook,
    Twitter,
    YouTube,
} from '@mui/icons-material'

export default function ToggleQuestion({
    id, // Add a unique ID for each question
    title,
    des1,
    li1,
    li2,
    li3,
    li4,
    des2,
    imgP,
    searchText,
    onToggle,
    isOpen,
}) {
    //INPUT SEARCH
    const combinedText = `${title} ${des1} ${des2} ${li1} ${li2} ${li3} ${li4}`
    const isMatchingSearch = combinedText
        .toLowerCase()
        .includes(searchText.toLowerCase())

    if (!isMatchingSearch) {
        return null
    }

    return (
        <div onClick={() => onToggle(id)}>
            <div className="flex justify-between py-4 items-center">
                <div className="font-bold text-xl">{title}</div>
                <div className="p-2 text-2xl">
                    {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
            </div>
            {isOpen ? (
                <div className="mb-5 ">
                    <div>{des1}</div>
                    {li1 && (
                        <ol className="list-decimal px-10 py-5">
                            <li>{li1}</li>
                            <li>{li2}</li>
                            <li>{li3}</li>
                            <li>{li4}</li>
                        </ol>
                    )}
                    <div className=" mb-5">{des2}</div>
                    {imgP && (
                        <div className="h-[200px] w-[350px] mb-4">
                            <img
                                className="h-full w-full object-cover"
                                src={imgP}
                                alt=""
                            />
                        </div>
                    )}
                    <div className="flex space-x-3">
                        <Facebook /> <Twitter />
                        <YouTube />
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
