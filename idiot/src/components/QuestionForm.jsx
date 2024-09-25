import { PiArrowBendUpRightBold } from "react-icons/pi";

const QuestionForm = ({ question, setQuestion, loading, handleSubmitQuestion }) => {
    return (
        <form className="relative mx-auto w-[80%]" onSubmit={(e) => handleSubmitQuestion(e)}>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" disabled={loading} className={loading ? "font-open-sans outline-none bg-black pl-5 pr-12 text-xl py-4 rounded-md w-full placeholder:text-black" : "font-open-sans outline-none bg-slate-100 pl-5 pr-12 text-xl py-4 rounded-md w-full"} placeholder="Введите ваш вопрос ....."/>
            <button type="submit" className="absolute outline-none right-3 bottom-3.5">
                <PiArrowBendUpRightBold  className="h-7 w-7"/>
            </button>
        </form>
    )
}

export default QuestionForm