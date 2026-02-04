import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getAllUsers, createChat } from "../services/chatServices.js";
import { AuthContext } from "../auth/AuthProvider.jsx";
import { sendMessage, fetchMessages } from "../services/messageServices.js";

const ChatPage = () => {
  const { user, authLoading, isAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([])
  const [msgToSend, setMsgToSend] = useState("")

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;
    const loadUsers = async () => {
      try {
        const res = await getAllUsers()
        setUsers(res.data.users)
      } catch (error) {
        console.error("Error in Loading Users", error.response?.message);

      }
    }
    loadUsers()
  }, [authLoading, isAuthenticated])
  // console.log(users);

  const handleSelectUser = async (userId) => {
    if (selectedChat && selectedChat.users.includes(userId)) {
      return; // Chat already selected
    }
    try {
      const res = await createChat(userId)
      setSelectedChat(res.data.data)
      console.log("Chat created:", selectedChat._id);
    } catch (error) {
      console.error("Error creating chat:", error.response?.message);
    }
  }




  useEffect(() => {
    const fetchMessagesForSelectedChat = async () => {
      if (!selectedChat) return;
      try {
        const res = await fetchMessages(selectedChat._id)
        setMessages(res.data.data)
        console.log(res.data.data);

      } catch (error) {
        console.error("Error in fetching messages", error.response?.message)
      }
    }
    fetchMessagesForSelectedChat();
  }, [selectedChat])

  const handleSendMessage = async () => {
    try {
      const res = await sendMessage(selectedChat._id, msgToSend)
      setMsgToSend("")
      // console.log(res.data);

    } catch (error) {
      console.error("Error in sending message", error.response?.message)
    }

  }

  return (
    <div className="h-screen w-full bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 flex">

      {/* Sidebar */}
      <div className="w-75 bg-white/30 backdrop-blur-xl border-r border-white/30 p-4">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Chats
        </h2>


        {users.map((user) => (
          <div key={user._id} onClick={() => handleSelectUser(user._id)} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/40 transition mb-2">
            <FaUserCircle className="text-3xl text-purple-700" />
            <div>
              <p className="font-medium text-purple-900">{user.username}</p>

            </div>
          </div>
        ))}


      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Chat Header */}
        <div className="h-16 bg-white/30 backdrop-blur-xl border-b border-white/30
                        flex items-center gap-3 px-6">
          <FaUserCircle className="text-3xl text-purple-700" />
          <div>
            <p className="font-semibold text-purple-900">{selectedChat?.chatName || "Select a user to start chatting"}</p>
            <p className="text-sm text-purple-700">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-purple-700">
              No messages yet. Start a conversation!
            </div>
          )}
          {messages.map((msg) => {
            const isMine =
              String(msg.sender._id) === String(user._id);

            return (
              <div
                key={msg._id}
                className={`max-w-[60%] p-3 rounded-2xl shadow text-sm
        ${isMine
                    ? "ml-auto bg-linear-to-r from-cyan-300 via-violet-400 to-purple-500 text-white"
                    : "bg-white/60 backdrop-blur-lg text-purple-900"
                  }`}
              >
                {msg.content}
              </div>
            );
          })}


        </div>

        {/* Input Box */}
        <div className="h-20 bg-white/30 backdrop-blur-xl border-t border-white/30
                        flex items-center px-4 gap-4">

          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            value={msgToSend}
            onChange={(e) => setMsgToSend(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-11 rounded-full px-4
                       bg-white/70 text-purple-900
                       focus:outline-none"
          />

          <button
            onClick={handleSendMessage}
            className="h-11 w-11 flex items-center justify-center rounded-full
                       bg-linear-to-r from-cyan-400 via-violet-500 to-purple-500
                       text-white text-xl hover:scale-110 transition"
          >
            <IoMdSend />
          </button>

        </div>
      </div>
    </div >
  );
};

export default ChatPage;
