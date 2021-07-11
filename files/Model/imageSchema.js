const mongoose=require('mongoose')

const imageSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"enter the title"]
    },
    description:{
        type:String,  
        required:[true,"enter something in description"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    is_private:{
        type:String,
        default:"public"
    },
    imageUrl:{
        type:String,
        required:[true,'please upload image']
    }
})

export default mongoose.model('image',imageSchema)