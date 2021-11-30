const API_Credentials={
    key : "c6a2dd6546f25a69297d83135746b4d7",
    baseURL : "https://api.openweathermap.org/data/2.5/weather"
}

const getDataFromInputBox = document.getElementById("input-box");

// Step-1 :- Event Listener Function on Key Press
getDataFromInputBox.addEventListener('keypress',(event) => {
    if(event.keyCode==13 || event.keyCode == 32)
    {
        console.log(getDataFromInputBox.value);
        getWeatherReport(getDataFromInputBox.value);
    }
    
})

// Step-2 :- Get Weather Report
function getWeatherReport(city)
{
    fetch(`${API_Credentials.baseURL}?q=${city}&appid=${API_Credentials.key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(showWeatherReport)
}   

// Step-3 :- Show weather Report
function showWeatherReport(weather)
{
    console.log(weather);

    var city=document.getElementById("city");
    city.innerText=`${weather.name},${weather.sys.country}`
    
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    var minmax=document.getElementById("min-max");
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;



    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('./images/clear.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 
}
// Step-4 :- Date Manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

