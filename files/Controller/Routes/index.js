const route=require('express').Router()
const jwt=require("jsonwebtoken")
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name: "do5myffsz",
    api_key: "867162412586856",
    api_secret: "YaL6VCn5vfpGbZbPoDhzFtLjq00",
  });
import signup from './../AllController/signup';
import Login from './../AllController/login'; 
import imageUpload from './../AllController/uploadImage';

const upload = async (req, resp, next) => {
    if (req.files) {
      if (req.files.image.mimetype == "image/png") {
        const file = req.files.image;
        let result = await cloudinary.uploader.upload(file.tempFilePath);
        req.result = result.url;
        return next();
      } else {
        let err = new Error("please upload the image file in png format");
        return next(err);
      }
    } else {
        let err = new Error("please upload the image");
      return next(err);
    }
  };

const auth=async(req,resp,next)=>{
    try{
        const token=req.headers.token
        if(!token){
            return resp.json({
                data:[],
                err:{msg:"please login"}
            })
        }
        const decode = await jwt.verify(req.header("token"), "zzz");
        req.userId=decode.id
        return next()
    }
    catch(e){
        return resp.json({
            data:[],
            err:{msg:"please login"}
        })
    }
}
route.post('/signup',signup.postSignup)
route.post('/login',Login.postLogin)
route.get('/allpublicimage',imageUpload.AllPublicImage)
route.post('/uploadimage',auth,upload,imageUpload.upload)
route.post('/myimages',auth,imageUpload.showMyImages)
route.post('/updateimage/:id',auth,upload,imageUpload.updateImage)
route.post('/deleteimage/:id',auth,imageUpload.deleteImage)
export default route