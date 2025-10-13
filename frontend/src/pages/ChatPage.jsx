import React from 'react'

const ChatPage = () => {
    return (
        <>
            <div className="flex h-screen">

                <div className="bg-[#471886]/90 w-[300px] min-h-screen text-[#d4ecf7]">
                    <div className="p-4 border-b border-[#8dc6ea]/20 cursor-pointer hover:bg-[#8dc6ea]/20">
                        User Name
                    </div>

                </div>

                <div className="flex-1 flex flex-col bg-[#061920]">

                    <div className="bg-[#471886]/80 h-[50px] flex items-center px-4">
                        Chat Header
                    </div>


                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-2">
                            <p className="bg-[#8dc6ea]/30 p-2 rounded inline-block">Hello!</p>
                        </div>
                        <div className="mb-2 text-right">
                            <p className="bg-[#c44ddf]/30 p-2 rounded inline-block">Hi there!</p>
                        </div>
                    </div>


                    <div className="bg-[#471886]/50 h-[50px] flex items-center px-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent text-white focus:outline-none px-2"
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatPage
