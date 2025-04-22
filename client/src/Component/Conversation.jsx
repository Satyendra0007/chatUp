import { Link, useNavigate } from "react-router-dom"


export default function Conversation({ conversationId, recieverId, firstName, imageUrl, email }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 px-2 py-2 md:py-1 shadow-md  w-[22rem] md:w-80 hover:bg-slate-100 cursor-pointer"
      onClick={() => navigate(`/chatlayout/chats/${conversationId}`, { state: { recieverId, firstName, imageUrl, email } })}
    >
      <div className="image ">
        <img className="w-12 h-12 rounded-full" src={imageUrl} alt="" />
      </div>
      <div className="info">
        <h3 className="font-semibold md:text-sm capitalize">{firstName ? firstName : "Harry"} </h3>
        <p className="text-xs md:text-[10px]">{email}</p>
      </div>
    </div>
  )
}
