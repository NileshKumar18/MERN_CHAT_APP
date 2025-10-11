import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
   chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },

},
{timestamps:true})

const message = mongoose.model("message" , messageSchema)
export default message