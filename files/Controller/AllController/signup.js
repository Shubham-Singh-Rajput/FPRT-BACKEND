import userModel from './../../Model/userSchema'
import bcrypt from 'bcrypt'
const jwt=require('jsonwebtoken')
const mongoose=require("mongoose")
const signup={
    postSignup:async(req,resp)=>{
        try{
            let presentUser=await userModel.findOne({email:req.body.email})
            if(presentUser){
                return resp.json({
                    data:[],
                    err:{msg:"email id is alredy present"}
                })
            }
            
            let salt=await bcrypt.genSalt(3)
            req.body.password.length>=3?req.body.password=await bcrypt.hash(req.body.password,salt):null
            let newUser=new userModel(req.body)
            await newUser.save()
            const token=jwt.sign({id:newUser._id},'zzz')
            return resp.json({
                data:[token],
                err:{}
            })
            
        }
        catch(e){
            if(e){
                if(e instanceof mongoose.Error.ValidationError){
                    let fields={}
                    for(let field in e.errors ){
                        fields[field]=e.errors[field].message
                    }
                    return resp.json({
                        data:[],
                        err:fields
                    })
                }
                else{
                    return resp.json({
                        data:[],
                        err:{msg:e.message}
                    })
                }
            }
        }

    }
}
export default signup