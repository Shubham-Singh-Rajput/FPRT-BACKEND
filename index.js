import 'babel-polyfill'
import mongooseConnection from './files/Model/connect'
import route from './files/Controller/Routes/index';
mongooseConnection()
const express=require('express')
const fileUpload=require("express-fileupload")
const cors=require('cors')
const PORT=process.env.PORT||2000
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
}))

app.use(route)
app.use((req,resp,next)=>{
    const err=new Error("PAGE NOT FOUND")
    next(err)
})
app.use((err,req,resp,next)=>{
    return resp.json({
        data:[],
        err:{msg:err.message}
    })
})
app.listen(PORT)