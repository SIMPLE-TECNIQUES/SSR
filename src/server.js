const path =require("path");
const express = require("express");
const res = require("express/lib/response");
const app=express();
const hbs=require("hbs");
const { query } = require("express");
const weather=require("./weatherApi/weather");
// const exphbs = require('express-handlebars'); 

console.log(path.join(__dirname,"../public"));
console.log(__filename);

// Path to certain files 
const pathToHtml=path.join(__dirname,"../public")
const staticRoute=express.static(pathToHtml);

//path to customised View template 
const pathToviewEngine=path.join(__dirname,"../template/views")

//path to partials 
const pathToPartials=path.join(__dirname,"../template/partials")
//make use of static server in public 
app.use(staticRoute);

// make use of dynamic server
app.set('view engine','hbs')

app.set("views",pathToviewEngine)
hbs.registerPartials(pathToPartials);
//Dynamic data in footer
// app.engine('hbs', exphbs.engine({
//     extname: '.hbs',
//     helpers: {
//       currentYear: () => new Date().getFullYear()
//     }
//   }));
  hbs.registerHelper('currentYear', () => new Date().getFullYear());

//routes

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        desc:"Weather information "
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page ",
        desc:"content in about "
    })
})


app.get("",(req,res)=>{
    res.send(`<h1>home page</h1>`);
})
// app.get("/about",(req,res)=>{
//    res.send({
//        location:"jkpm",
//        weather:"rainy"
//    });
// })
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
app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return  res.send({
            error:"provide the address value"
        })
  
    }else{
        weather(req.query.address,(error,{location,Temp,longitude,latitude})=>{
            console.log(req.query.address);
            if(error){
                console.log(data);
            res.send({
            // location:`${data.location}`,
            // Temp:`${data.current}`
            ErrorMsg:error
            
            })}
            return res.send({
                // weatherData:data,
                location,
                Temp,
                longitude,
                latitude
                // location:data.location,
                // Temperture: data.Temp,
                // Longitude:data.longitude,
                // latitude:data.latitude
            })
        })

    // res.send({
    //     weather:"good weather",
    //     address:req.query.address
    // })
    // console.log(query.address)
}
})
 app.get("/about/*",(req,res)=>{
     res.render("404page",{
        title:"404 page",
        errormsg:"about info is not found"

     })

 })

 app.get("*",(req,res)=>{
res.render("404page",{
    title:"404 page",
    errormsg:"info not found server error "
    

})
 })

app.listen(3000,()=>{
    console.log("listeneing in port 3000");
})