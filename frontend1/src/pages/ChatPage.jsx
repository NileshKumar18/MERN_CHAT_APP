import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect , useState } from "react";
import { getAllUsers , createChat } from "../services/chatServices.js";
import { AuthContext } from "../auth/AuthProvider.jsx";

const ChatPage = () => {
  const {authLoading , isAuthenticated} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if(authLoading) return; 
    if(!isAuthenticated) return; 
    const loadUsers = async () => {
      try {
        const res = await getAllUsers()
        setUsers(res.data.users)
      } catch (error) {
        console.error("Error in Loading Users", error.response?.message);

      }
    }
    loadUsers()
  } , [authLoading , isAuthenticated])
  // console.log(users);
  
  const handleSelectUser = (userId) => {
    const createChatWithUser = async() => {
      try {
        const res = await createChat(userId)
        console.log("Chat created:", res.data);
      } catch (error) {
        console.error("Error creating chat:", error.response?.message);
      }
    }
    createChatWithUser()
  }

  return (
    <div className="h-screen w-full bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 flex">

      {/* Sidebar */}
      <div className="w-75 bg-white/30 backdrop-blur-xl border-r border-white/30 p-4">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Chats
        </h2>

        
       {users.map((user) => (
        <div key={user._id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/40 transition mb-2">
          <FaUserCircle className="text-3xl text-purple-700" />
          <div>
            <p onClick={() => handleSelectUser(user._id)} className="font-medium text-purple-900">{user.username}</p>
            
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
            <p className="font-semibold text-purple-900">John Doe</p>
            <p className="text-sm text-purple-700">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">

          {/* Incoming */}
          <div className="max-w-[60%] bg-white/60 backdrop-blur-lg
                          p-3 rounded-2xl text-purple-900 shadow">
            Hey! How are you?
          </div>

          {/* Outgoing */}
          <div className="max-w-[60%] ml-auto
                          bg-linear-to-r from-cyan-300 via-violet-400 to-purple-500
                          text-white p-3 rounded-2xl shadow">
            I’m good! Working on the chat UI 😄
          </div>

          {/* Incoming */}
          <div className="max-w-[60%] bg-white/60 backdrop-blur-lg
                          p-3 rounded-2xl text-purple-900 shadow">
            Looks clean already!
          </div>

        </div>

        {/* Input Box */}
        <div className="h-20 bg-white/30 backdrop-blur-xl border-t border-white/30
                        flex items-center px-4 gap-4">

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-11 rounded-full px-4
                       bg-white/70 text-purple-900
                       focus:outline-none"
          />

          <button
            className="h-11 w-11 flex items-center justify-center rounded-full
                       bg-linear-to-r from-cyan-400 via-violet-500 to-purple-500
                       text-white text-xl hover:scale-110 transition"
          >
            <IoMdSend />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
