import { FaArrowLeft } from "react-icons/fa";
import user from "@/assets/user.png"
import { BsFillSendFill } from "react-icons/bs";
import Chat from "@/Component/Chat";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chats() {
  const { convid } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const { firstName, imageUrl, email } = location.state || {};


  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}api/message/get/${convid}`, {
        withCredentials: true,
      });
      setMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}api/message/send`, {
        conversationId: convid,
        text
      }, {
        withCredentials: true,
      })
      fetchMessages();
      setText("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [convid])


  return (
    <div className="flex flex-col">
      <div className="user flex p-3 md:p-2 bg-gray-100 ">
        <Link to="/conversation" >
          <div className="button text-2xl h-12 w-12 flex-shrink-0 flex justify-center items-center  bg-gray-200 rounded-full shadow-xl md:hidden">
            <FaArrowLeft />
          </div>
        </Link>
        <div className="info">
          <div className="flex gap-4 px-2 py-1 ">
            <div className="image ">
              <img className="w-12 h-12 rounded-full" src={imageUrl} alt="" />
            </div>
            <div className="info">
              <h3 className="font-semibold capitalize">{firstName}</h3>
              <p className="text-xs">{email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="chats h-[82vh] p-2">
        {messages.length == 0 && <div className="text-center my-3"> No Messages </div>}
        {messages.map((message, index) => {
          return <Chat key={index} {...message} />
        })}

      </div>
      <div className="options flex justify-between px-2 md:gap-4">
        <div className="input md:flex-grow-1 ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border border-gray-400 w-72 md:w-full h-11.5 md:h-10 px-2.5 rounded-lg shadow-lg md:text-sm' type="text" placeholder='Type Message Here ....' />
        </div>
        <div className="button">
          <button disabled={text.length === 0} onClick={sendMessage} className="p-3 md:p-2.5 cursor-pointer primary-bg text-white text-xl rounded-lg disabled:opacity-90 "><BsFillSendFill /></button>
        </div>
      </div>
    </div>
  )
}
