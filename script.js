let base_url="https://api.weatherapi.com/v1/current.json?key=779b5740fc60425ebb2191506252107&q=";

let search=document.querySelector("#search input");
let btn1=document.querySelector("#btn1");
let temp=document.querySelector("#temp")
let humid=document.querySelector("#humi");
let wind=document.querySelector("#w");
let condition=document.querySelector("#cond");
let photo=document.querySelector("#photo");
let clear=document.querySelector("#clear");
let qoutes=document.querySelector("#ai");
let songs=document.querySelector("#spotifyplay");
let hide=document.querySelector("#song")
let hide2=document.querySelector("#qoutes");
let hide3=document.querySelectorAll(".hide");


let updateplaylist=(mood)=>{
songs.src=playlist[mood];
}


let mooddetect=(text)=>{
  if(text.includes("Sunny")||text.includes("sunshine"))
    return "sunny";
  if(text.includes("Cloudy")||text.includes("Partly cloudy")||text.includes("Overcast"))
    return "cloudy";
   if(text.includes("Mist")||text.includes("Fog")||text.includes("Freezing fog")||text.includes("Haze"))
    return "foggy";
    if(text.includes("Patchy rain")||text.includes("Light rain")||text.includes("Rain")||text.includes("Moderate rain")||text.includes("Heavy rain")||text.includes("Shower"))
    return"rainy";
    if(text.includes("patchy snow")||text.includes("Light snow")||text.includes("Snow")||text.includes("Moderate snow")||text.includes("Heavy snow")||text.includes("Blizzard"))
    return"snowy";
     if(text.includes("Thundery outbreaks")||text.includes("Thunderstorm")||text.includes("Heavy thunderstorm")||text.includes("Patchy light rain with thunder"))
    return"stormy";
     if(text.includes("Clear")||text.includes("Mainly clear")||text.includes("Mostly clear")||text.includes("bright"))
     return "clear";

     return "cloudy";
     
}

let moodupdate=(mood)=>{
  let prompts=moodprompts[mood];
  let randomidx=Math.floor(Math.random()*prompts.length);
  qoutes.innerText=prompts[randomidx];

}

let tempupdate=(temp_c)=>{
    temp.innerText=`${temp_c}°C`;
}
let windupdate=(wind_kph)=>{
    wind.innerText=`${wind_kph}km/h`;
}
let humidityupdate=(humidity)=>{
    humid.innerText=`${humidity}%`;
}
let conditionupdate=(text)=>{
    condition.innerText=`${text}`;
}
let photoupdate=(icon)=>{
   photo.src="https:" + icon;
  
}

let errorphoto=()=>{
    clear.innerHTML=`
    <img id="data" src="error.png" style="height:16rem; padding-top:5rem">
    <P style="font-size:1.5rem; color:black;font-weight:500">oops data not found!</P>`;
   
}

btn1.addEventListener("click",async ()=>{
 
    let url=`${base_url}${search.value}`;
    try{
         let response=await fetch(url);
    if (!response.ok) {
      throw new Error("Invalid response");
    }
    let data=await response.json();
    console.log(data);
   if(search.value!==data.location.country) 
   {
    console.log("wrong");
   }
   
   hide2.classList.remove("hide");
   hide.classList.remove("hide");
   hide3.forEach((ele )=>{
      ele.classList.remove("hide");
   })
   
  tempupdate(data.current.temp_c);
  windupdate(data.current.wind_kph);
  humidityupdate(data.current.humidity);
  conditionupdate(data.current.condition.text);
  photoupdate(data.current.condition.icon);

  let mood=mooddetect(data.current.condition.text);
 moodupdate(mood);
 updateplaylist(mood);
}
  catch(error)
  {
console.log(error);
if(clear){
   clear.innerHTML="";
   errorphoto();
}
  }
})




