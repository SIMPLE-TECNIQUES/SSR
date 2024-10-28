const path =require("path");
const express = require("express");
const res = require("express/lib/response");
const app=express();

console.log(path.join(__dirname,"../public"));
console.log(__filename);


// Path to certain files 
const pathToHtml=path.join(__dirname,"../public")
const staticRoute=express.static(pathToHtml);

//path to customised View template 
const pathToviewEngine=path.join(__dirname,"../template")
//make use of static server in public 
app.use(staticRoute);

// make use of dynamic server
app.set('view engine','hbs')

app.set("views",pathToviewEngine)

//routes
app.get("",(req,res)=>{
    res.render("index",{
        title:"home page ",
        desc:"content in home page"
    })
})


app.get("",(req,res)=>{
    res.send(`<h1>home page</h1>`);
})
app.get("/about",(req,res)=>{
   res.send({
       location:"jkpm",
       weather:"rainy"
   });
})
app.get("/profile",(req,res)=>{
    res.send([{
        location:"jkpm",
        weather:"rainy"
    },
    {
        location:"jkpm",
        weather:"rainy"
    }]);
 })

app.listen(3000,()=>{
    console.log("listeneing in port 3000");
})