const mongoose=require('mongoose')

const uerSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter the name']
    },
    email:{
        type:String,
        required:[true,"enter the email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required: [true,'enter the password'],
        minlength: [3,"enter minimum length of three"],
        trim: true
    }

})

export default mongoose.model('user',uerSchema)