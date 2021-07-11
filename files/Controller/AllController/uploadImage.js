import imageModel from './../../Model/imageSchema'
const mongoose=require('mongoose')
const imageUpload={
    
    upload:async(req,resp)=>{
        try {
            let uploadImage= new imageModel(req.body)
            req.result!=undefined?uploadImage.imageUrl=req.result:uploadImage.imageUrl=''
            uploadImage.userId=mongoose.Types.ObjectId(req.userId)
            await uploadImage.save()
            return resp.json({
                data:[uploadImage],
                err:{}

            })
        } catch (e) {
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
    },
    showMyImages:async(req,resp)=>{
        try{
            let allImages=await imageModel.find({userId:mongoose.Types.ObjectId(req.userId)})
            return resp.json({
                data:allImages,
                err:{}
            })
        }
        catch(e){
            return resp.json({
                data:[],
                err:{
                    msg:e.message
                }
            })
        }
    },
    updateImage:async(req,resp)=>{
        try{
        const imageId=req.params.id
        let perviousData=await imageModel.findOne({_id:req.params.id})
        req.body.title=req.body.title||perviousData.title
        req.body.description=req.body.description||perviousData.description
        req.body.is_private=req.body.is_private||perviousData.is_private
        let updatedImages=await imageModel.findOneAndUpdate({_id:imageId,userId:mongoose.Types.ObjectId(req.userId)},{$set:{...req.body,imageUrl:req.result}},{new:true})
        if(updatedImages==null){
            return resp.json({
                data:{},
                err:{msg:"PLEASE PROVIDE A VALID IMAGE ID"}
            })
        }
        return resp.json({
            updatedImages
        })
        }
        catch(e){
            return resp.json({
                data:[],
                err:{msg:e.message}
            })
        }
    },
    deleteImage:async(req,resp)=>{
        try{
        let deleted=await imageModel.findOneAndDelete({_id:req.params.id,userId:mongoose.Types.ObjectId(req.userId)})
        if(deleted==null){
            return resp.json({
                data:[],
                err:{msg:"please povide a valid image id"}
            })
        }
        return resp.json({
            data:[deleted],
            err:{}
        })
        }
        catch(e){
            return resp.json({
                data:[],
                err:{msg:e.message}
            })
        }

    },
    AllPublicImage:async(req,resp)=>{
        try{
            const PublicImage=await imageModel.find({is_private:'public'}).populate('userId')
            const Alldata=PublicImage.map(i=>{
                return{
                    title:i.title,
                    description:i.description,
                    imageUrl:i.imageUrl,
                    name:i.userId.name
                }
            })
            
            return resp.json({
                data:Alldata,
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
export default imageUpload