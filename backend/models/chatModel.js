import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    users : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    }],
    chatName : {
        type:String,
        trim : true,
        default:"Sender"
    },
    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "message",
        default : null
        
    }
},
{timestamps:true}
) 
const chat = mongoose.model('chat' , chatSchema)
export default chat