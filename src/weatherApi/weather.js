const request =require("request");
// import request from "request";

// dynamic way to fetch weather  
var address=process.argv[2];


const weather=(address,callback)=>{
const place =address;
const url = `https://api.weatherstack.com/current?access_key=655e140045ae99bf58ea6eba93b49e45&query=${place}`;

// request({ url: URL, json: true }, (error, response, body) => {
    // destructing body argument and shorthand property at URL
    request({ url, json: true }, (error, response, {location,current,Error}={}) => {
    if (error) {
        callback(error,"Error in network")
    } else if (response.statusCode !== 200) {
        callback(`${response.statusCode}`,undefined);
    } else if (Error) {
        callback(Error.info,undefined)
    } else {
        callback(undefined,{

            // using destructured object 

            // data1:`In ${location.name}, the temperature is ${current.temperature}°C`,
            // data2:`Area: ${location.name}, Latitude: ${location.lat}, Longitude: ${location.lon}`
            location:location.name,
            Temp:current.temperature,
            Latitude:location.lat,
            longitude:location.lon

            //using normal onbject 

            // data1:`In ${body.location.name}, the temperature is ${body.current.temperature}°C`,
            // data2:`Area: ${body.location.name}, Latitude: ${body.location.lat}, Longitude: ${body.location.lon}`
        }
            )
    }
});
}

module.exports=weather;
