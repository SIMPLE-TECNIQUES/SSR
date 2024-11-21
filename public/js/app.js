// console.log("wather data");
function fetchData(address,msg1,msg2){
fetch(`http://localhost:3000/weather?address=${address}`)
.then((response)=>response.json())
.then((data)=>{
    if(data.error){
        msg1.textContent=data.error;
        console.log(data.error)
    }else{
        msg2.textContent = 
        `Location: ${data.location}, 
        Temperature: ${data.Temp}, 
        Longitude: ${data.longitude}`;

    console.log({
        location:data.location,
        temperature:data.Temp,
        longitude:data.longitude
    });

    }
})

}

document.addEventListener("DOMContentLoaded", () => {
const WeatherForm=document.querySelector("form");
const search=document.querySelector("input");
const msg1=document.querySelector("#msg1");
const msg2=document.querySelector("#msg2");



WeatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location =search.value;
    // console.log(location);
    fetchData(location,msg1,msg2);
})
});