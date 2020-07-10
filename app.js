const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

res.render("home");

})


app.post("/", function(req,res){

  var city = req.body.city;

  

    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=155c4689eb1b169fdb51abfabcb40afb&units=metric#";
    https.get(url, function(response){
      const statusCode=response.statusCode;
      if(statusCode!=200){
        res.render("notFound",{city:"",weatherDescription:"of city not found,try again",str:"", temp:""});}
         else if(statusCode===200){
           response.on("data", function(data){
       const weatherData = JSON.parse(data);

       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const str="http://openweathermap.org/img/wn/"+ icon +"@4x.png"

     if(statusCode===200){
       res.render("post",{city:city,weatherDescription:weatherDescription,str:str, temp:temp});}


       // res.write("<h1>The temparature in " + city + " is "  + temp + " degree celcius</h1>");
       // res.write("<p1>The Weather currently is " + weatherDescription + " </p1>");
       // res.write("<img src=" + "http://openweathermap.org/img/wn/"+ icon +"@2x.png>"  );
       // res.send();


           })
         }

        }
)




})




app.listen(3000,function(){
  console.log("Server is running at 3000.");
})
