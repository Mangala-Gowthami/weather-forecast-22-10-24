const temp = document.getElementById("temp");
   date = document.getElementById("date-time");
   currentLocation = document.getElementById("location");
   condition = document.getElementById("condition");
   rain = document.getElementById("rain");
   mainIcon = document.getElementById("icon";
   uvIndex = document.querySelector("uv-index");
   )

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";


//Update Date time

function getDateTime(){
let now = new Date(),
hour = now.getHours(),
minute = now.getMinutes();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
];
 
hour = hour % 12;
if(hour < 10){
    hour = "0" + hour;
}
if (minute < 10){
    minute = "0" + minute;
}

let dayString = days[now.getDay()];
return `${dayString}, ${hour}:${minute}`;
}
Date.innerText = getDateTime();

//update time every second
setInterval(() => {
    date.innerText = getDateTime();
},1000);

//function to get public ip with fetch

function getPublicIp(){
    fetch("https://geolocation-db.com/json/",{
      method: "GET",
    })
    .then((response) => response.json())
    .then((date) => {
        console.log(data);
        currentCity = data.currentCity;
        getWeatherData(data.city, currentCity, hourlyorWeek);
    });
}
getPublicIp();

//function to get weather data

function getWeatherData(city, unit, hourlyorWeek){
    const apiKey = 
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/
        rest/services/timeline/$%7Bcity?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
        {
            method: "GET",
        }
    )
    .then((response) => response.json())
    .then((data) => {
        let today = data.currentConditions;
        if(unit === "C"){
            temp.innerText = today.temp;
        }
        else{
            temp.innerText = celsiusToFahrenheit(today.temp);
        }
        currentLocation.innerText = data.resolvedAddress;
        CSSConditionRule.innerText = today.conditions;
    });
}
//convert celsius to fahrenheit
function celsiusToFahrenheit(temp){
    return ((temp * 9) / 5 + 32).toFixed(1);
}