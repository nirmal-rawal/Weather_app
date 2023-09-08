// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
  key: "a08080f21c75b8c1f26b4d68ff857769",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

const searchInputBox = document.getElementById('input-box');
document.querySelector('.weather-body').style.display = "block";
// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);

  }

});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);


  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById('min-max');
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherType = document.getElementById('weather');
  weatherType.innerText = `${weather.weather[0].main}`;

  let humidityElement = document.querySelector('.humidity');
  humidityElement.innerHTML = "<b>Humidity: </b>" + `<b>${weather.main.humidity}%</b>`;

  let pressureElement = document.querySelector('.pressure');
  pressureElement.innerHTML = "<b>Pressure: </b>" + `<b>${weather.main.pressure} hPa</b>`;

  let windSpeedElement = document.querySelector('.windSpeed');
  windSpeedElement.innerHTML = "<b>Wind Speed: </b>" + `<b>${weather.wind.speed}m/s</b>`;

  let date = document.getElementById('date');
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);


  if (weatherType.textContent == 'Clear') {
    document.body.style.backgroundImage = "url('images/clear.png')";
    document.body.style.backgroundPosition ="left"
    document.body.style.backgroundSize = "300px 400px";


  } else if (weatherType.textContent == 'Clouds') {

    document.body.style.backgroundImage = "url('images/clouds.png')";
    document.body.style.backgroundPosition ="left";
    document.body.style.backgroundSize = "200px 400px";

  } else if (weatherType.textContent == 'Haze') {

    document.body.style.backgroundImage = "url('images/clouds.png')";
    document.body.style.backgroundPosition ="left";
    document.body.style.backgroundSize = "200px 400px";

  } else if (weatherType.textContent == 'Rain') {

    document.body.style.backgroundImage = "url('images/rain.png')";
    document.body.style.backgroundPosition ="left";
    document.body.style.backgroundSize = "200px 400px";

  } else if (weatherType.textContent == 'Snow') {

    document.body.style.backgroundImage = "url('images/snow.png')";
    document.body.style.backgroundPosition ="left";
    document.body.style.backgroundSize = "200px 400px";

  } else if (weatherType.textContent == 'Thunderstorm') {

    document.body.style.backgroundImage = "url('images/thunderstorm.png')";
    
    document.body.style.backgroundSize = "200px 400px";

  }
}

// Date manage
function dateManage(dateArg) {

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}


getWeatherReport("Eufaula");