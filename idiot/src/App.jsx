import axios from "axios"
import { useState } from "react";

import { FaSun } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import QuestionForm from "./components/QuestionForm";
import ImageForm from "./components/ImageForm";

function App() {
  const [option, setOption] = useState('image')
  const [loading, setLoading] = useState(false)
  const url = `http://127.0.0.1:8000/`

  // ---------------------------------------------------------------------------------------------------------------

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [results, setResults] = useState({})
  const [error, setError] = useState([])

  async function fetchAi(userRequest) {
    try {
      const { data } = await axios.post(url + `roles/chat/response/`, {
        roles: 1,
        request: userRequest 
      })

      setResults(data)
      setLoading(false)

      return data
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
    }
  }

  const handleSubmitQuestion = (e) => {
    e.preventDefault()
    fetchAi(question)
    setQuestion('')
    setAnswer(question)
    setLoading(true)
  }

  // ---------------------------------------------------------------------------------------------------------------

  const [viewImage, setViewImage] = useState(false)
    const [imageHref, setImageHref] = useState('')
    const [imageReq, setImageReq] = useState('')
    const [response, setResponse] = useState({})
    const [imageError, setImageError] = useState({})

    async function fetchImageAi(imageRequest) {
      try {
        const { data } = await axios.post(url + `roles/chat/response/generate-image`, {
          request: imageRequest
        })

        setResponse(data)
        setLoading(false)
        setViewImage(true)

        return data
      } catch (error) {
        console.error(error)
        setImageError(error)
        setLoading(false)
      }
    }

    const handleSubmitImage = (e) => {
      e.preventDefault()

      fetchImageAi( imageReq)
      setImageReq('')
      setImageHref(imageReq)
      setLoading(true)
      setViewImage(false)
    }

  return (
    <>
      {loading ?
        <>
          <AiOutlineLoading3Quarters className="w-16 h-16 absolute top-1/2 right-1/2 -mr-7 animate-spin mt-10 z-[60] text-white" />
        </>
        : ""
      }
      <div>
        <div className={ loading ? "relative blur-sm bg-[#000000b5] overflow-hidden z-50 h-[150vh]" : "relative bg-slate-200 h-[150vh]" }>
          <header className="fixed flex justify-between items-center bg-slate-600 h-16 left-0 right-0 z-30">
              <div className="ml-2">
                <select disabled={loading} value={option} onChange={(e) => setOption(e.target.value)} className="font-open-sans outline-none py-2 pl-2 pr-40 bg-slate-500 text-white">
                  <option value="chat">Ответы не вапросы</option>
                  <option value="image">Генерация фото</option>
                </select>
              </div>
              <div className="mr-28">
                <div className="text-2xl font-open-sans text-white">Политехнический колледж.</div>
              </div>
              <div>
                <span className="font-open-sans text-white text-lg mr-5">Demo versions 0.0.1</span>
              </div>
          </header>
          <div className="flex flex-col justify-center items-center pt-20">
            <div className="flex flex-col items-center gap-5">
              <span className="font-open-sans text-7xl">Чат ассистент</span>
              <span className="font-open-sans text-3xl font-bold">Как я могу помочь тебе сегодня?</span>
            </div>

            <div className="flex items-center justify-center w-[65%] pt-20">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-3">
                  <FaSun className="h-8 w-8" />
                  <span className="text-xl font-open-sans">Пример вопроса</span>
                  <div className={loading ? "flex items-center text-center border bg-black rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5" : "flex items-center text-center border bg-slate-100 rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5"}>
                    <span className="text-lg">Первый президент Соединенных Штатов Америки?</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <BsFillLightningFill className="h-8 w-8" />
                  <span className="text-xl font-open-sans">Возможность чата</span>
                  <div className={loading ? "flex items-center text-center border bg-black rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5" : "flex items-center text-center border bg-slate-100 rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5"}>
                    <span className="text-lg">Генерация фотографий, ответы на любые вопросы.</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <FiAlertTriangle className="h-8 w-8" />
                  <span className="text-xl font-open-sans">Ограничение чата</span>
                  <div className={loading ? "flex items-center text-center border bg-black rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5" : "flex items-center text-center border bg-slate-100 rounded-lg px-2 py-5 mr-1 w-[300px] h-[100px] mt-5"}>
                    <span className="text-lg">История вопросов не сохроняется, профиля нет.</span>
                  </div>
                </div>
              </div>
            </div>

            {option === "chat" ?
              <div className="w-[80%] pt-20 pb-32">
                <div className="flex justify-end">
                  <div className="flex justify-end mt-10 w-[50%]">
                    <span className="text-left break-all text-lg">
                      {answer}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-start">
                  <div className="flex justify-start mt-10 w-[60%]">
                    <span className="text-left break-all text-lg">
                      {results.response}
                    </span>
                  </div>
                </div>
              </div>
              : option === "image" ?
              <div className="w-[80%] pt-20 pb-32">
                <div className="flex justify-end">
                  <div className="flex justify-end mt-10 w-[50%]">
                    <span className="text-left break-all text-lg">
                      {imageHref}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-start">
                  <div className="flex justify-start mt-10 w-[60%]">
                    { viewImage ? <img src={response.url_response} alt="Open AI Image" className="object-cover w-full h-full" /> : <span></span> }
                  </div>
                </div>
              </div> : ""
            }


            
            <div className="fixed bottom-5 flex items-center w-full">
              {option === "chat" ? <QuestionForm question={question} setQuestion={setQuestion} loading={loading} handleSubmitQuestion={handleSubmitQuestion} /> :
              option === 'image' ? <ImageForm imageReq={imageReq} setImageReq={setImageReq} loading={loading} handleSubmitImage={handleSubmitImage} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App