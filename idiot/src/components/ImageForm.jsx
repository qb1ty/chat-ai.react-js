import { PiArrowBendUpRightBold } from "react-icons/pi";

const ImageForm = ({ imageReq, setImageReq, loading, handleSubmitImage }) => {
    return (
        <form className="flex items-center gap-3 relative mx-auto w-[80%]" onSubmit={(e) => handleSubmitImage(e)}>
            <input value={imageReq} onChange={(e) => setImageReq(e.target.value)} type="text" disabled={loading} className={loading ? "font-open-sans outline-none bg-black pl-5 pr-12 text-xl py-4 rounded-md w-full placeholder:text-black" : "font-open-sans outline-none bg-slate-100 pl-5 pr-12 text-xl py-4 rounded-md w-full"} placeholder="Опешите вашу картину очень подробно....."/>
            <button type="submit" className="absolute outline-none right-3 bottom-3.5">
                <PiArrowBendUpRightBold  className="h-7 w-7"/>
            </button>
        </form>
    )
}

export default ImageForm