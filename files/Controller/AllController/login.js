import userModel from './../../Model/userSchema'
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Login={
       postLogin:async(req,resp)=>{
           try{
            if(req.body.email.trim().length==0 || req.body.password.trim().length==0){
                return resp.json({
                    data:[req.body.email],
                    err:{msg:"email filed is empty or password field is empty"}
                })
            }
           let presentUser=await userModel.findOne({email:req.body.email})
           if(!presentUser){
               return resp.json({
                   data:[req.body.email],
                   err:{msg:"enter the valid email"}
               })
           }
           const match=await bcrypt.compare(req.body.password,presentUser.password)
           if(match==false){
               return resp.json({
                   data:[],
                   err:{msg:"please enter a valid password"}
               })
           }
           const token=jwt.sign({id:presentUser._id},'zzz')
           return resp.json({
               data:[token],
               err:{}
           })
           }
           catch(e){
               return resp.json({
                   data:[],
                   err:{msg:e.message}
               })
               
           }
       } 
}
export default Login