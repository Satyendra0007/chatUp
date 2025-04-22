import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const ContextStore = createContext();

export default function ContextWraper({ children }) {
  const [conversations, setCoversations] = useState([])

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}api/conversation`, {
        withCredentials: true,
      });
      setCoversations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContextStore.Provider value={{ conversations, setCoversations, fetchConversations }} >
      {children}
    </ContextStore.Provider>
  )
}
