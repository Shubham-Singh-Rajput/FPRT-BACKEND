const mongoose=require('mongoose')
const connect=async()=>{
    try{
        const uri="mongodb+srv://shubham-72:mondob1@cluster0.cieyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
        console.log('connected')
    }
    catch(e){
        console.log(e.message)
    }
}
export default connect
// 'mongodb://localhost:27017/FPRT'