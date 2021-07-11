const mongoose=require('mongoose')
const connect=async()=>{
    try{
        const uri='mongodb://localhost:27017/FPRT'
        await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
        console.log('connected')
    }
    catch(e){
        console.log(e.message)
    }
}
export default connect