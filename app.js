const express=require('express');
const exhbs=require('express-handlebars');
const app=express();
const path=require('path')
const rt=require('./routs/router');
const bodyparser = require('body-parser');



app.use(bodyparser.urlencoded({extended:true}))
app.engine('hbs',exhbs.engine({layoutsDir:'views',defaultLayout:false,extname:"hbs"}));

app.set('view engine','hbs');
app.set("views",'views');
app.use(express.static(path.join(__dirname,"scripts")))
app.use(express.static(path.join(__dirname,'img')))
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,"uploads")))
app.use(rt)


app.listen(3000,()=>{
    console.log('listening 3000 port')
})