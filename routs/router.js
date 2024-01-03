const express=require('express');
const router=express.Router();
const path=require('path');
const dbs=require('../db/db');
const multer=require("multer");
const bodyparser=require('body-parser');


router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())

var fileUrl;

var storage=multer.diskStorage({
    destination:function(req,file,cb){
       
        cb(null,'uploads')},
    filename:function(req,file,cb){
     fileUrl=file.originalname.replace(/\.[^/.]+$/,'') +"_"+ Date.now()+path.extname(file.originalname);

     cb(null,fileUrl)
    }
})
let max_size=7*1024*1024
let upload=multer({
    storage:storage,
    limits:{
        fileSize:max_size
    },
    fileFilter:function(req,file,cb){
        let filetypes=/jpeg|jpg|png/;
        let mimetype=filetypes.test(file.mimetype)
        let extname=filetypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return cb(null,true)
        }
        cb('error:File uppload only support following'+filetypes);
    }

})



router.get('/blog',async (req,res,next)=>{
    let database=await dbs.getdatabase();
    let collection=database.collection('blogs');
    let first_three=await collection.find().limit(3).toArray();
    let all=await collection.find().limit(9).toArray();
    let number=await collection.count()-1;
    let popular=[];

    number=number/9
    number+=1;
    let query=req.query.status;
    let title_search=req.query.title_search;
    let categories=req.query.category;
    
    console.log(categories)
    let blog=req.query.blog;
    console.log(title_search)
    let skip=query-1;
    let skip2=skip+1;
    if(!query==''){

        let data=await collection.find().skip(skip*9).limit(9).toArray();
        res.send(data)
    }
    else if(!title_search==''){
        let array=[];
        let lot=await collection.find().toArray();
        let number4=await collection.count();
        all=await collection.find({blog_title:{$regex:title_search} }).toArray();
        console.log(all)
        if(await collection.count()<6){
            for(let i=0;i<number4;i++){
                popular.push(lot[Math.floor(Math.random()*number4)])
              }
        }
        else{
            for(let i=0;i<6;i++){
                popular.push(lot[Math.floor(Math.random()*7)])
              }
        }
   
        
        for(let i=1;i<=number;i++){
            array.push(i)
        }
      
        res.render(path.join(__dirname,'../',"views",'index.hbs'),{first_three,all,array,popular})
    }
    else if(!categories==''){
        let array=[];
        let lot=await collection.find().toArray();
        let number4=await collection.count();
        all=await collection.find({category:categories}).toArray();
        console.log(all)
        if(await collection.count()<6){
            for(let i=0;i<number4;i++){
                popular.push(lot[Math.floor(Math.random()*number4)])
              }
        }
        else{
            for(let i=0;i<6;i++){
                popular.push(lot[Math.floor(Math.random()*7)])
              }
        }
   
        
        for(let i=1;i<=number;i++){
            array.push(i)
        }
      
        res.render(path.join(__dirname,'../',"views",'index.hbs'),{first_three,all,array,popular})
    }
    else if(!blog==''){
        let array=[];
        let lot=await collection.find().toArray();
        let number4=await collection.count();
        all=await collection.find({blog_type:blog}).toArray();
        console.log(all)
        if(await collection.count()<6){
            for(let i=0;i<number4;i++){
                popular.push(lot[Math.floor(Math.random()*number4)])
              }
        }
        else{
            for(let i=0;i<6;i++){
                popular.push(lot[Math.floor(Math.random()*7)])
              }
        }
   
        
        for(let i=1;i<=number;i++){
            array.push(i)
        }
      
        res.render(path.join(__dirname,'../',"views",'index.hbs'),{first_three,all,array,popular})
    }
    else{
        let array=[];
        let lot=await collection.find().toArray();
        let number4=await collection.count()
        if(await collection.count()<6){
            for(let i=0;i<number4;i++){
                popular.push(lot[Math.floor(Math.random()*number4)])
              }
        }
        else{
            for(let i=0;i<6;i++){
                popular.push(lot[Math.floor(Math.random()*7)])
              }
        }
   
        
        for(let i=1;i<=number;i++){
            array.push(i)
        }
      
        res.render(path.join(__dirname,'../',"views",'index.hbs'),{first_three,all,array,popular})
    }

})

router.get('/newblog',(req,res,next)=>{
   res.render('new')
})
router.post('/store-data',upload.single('mypic'),async (req,res,next)=>{
    let database=await dbs.getdatabase();
    let collection=database.collection('blogs');
    console.log('seelan')
    let date=new Date();
 
    let datestr=date.toLocaleDateString()
    console.log(req)
    console.log(req.body.category)
    let data={category:req.body.category,file_name:fileUrl,blog_date:datestr,blog_name:req.body.blog_name,blog_title:req.body.blog_title,blog_content:req.body.blog_content.split('#'),blog_type:req.body.blog_type,author_name:req.body.author,tags:req.body.tags.split("#")};
    collection.insertOne(data)
    console.log(data)
    res.redirect('/blog')
 })
router.post('/title-search',(req,res,next)=>{
    let title_search=req.body.title_search;
    res.redirect('/blog?title_search='+title_search)
 })
 router.get("/show",async (req,res,next)=>{
    let show_id=req.query.show_id;
    console.log(req.query.show_id)
    let popular=[];

    let database=await dbs.getdatabase();
    let collection=database.collection('blogs');
    let showing= await collection.findOne({_id:new dbs.objid(show_id)});
    let lot=await collection.find().toArray();
    let number4=await collection.count()
    if(await collection.count()<6){
        for(let i=0;i<number4;i++){
            popular.push(lot[Math.floor(Math.random()*number4)])
          }
    }
    else{
        for(let i=0;i<6;i++){
            popular.push(lot[Math.floor(Math.random()*7)])
          }
    }
    res.render(path.join(__dirname,'..',"views","show.hbs"),{showing,popular})
 })
module.exports=router         