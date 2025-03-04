const API_KEY = "e2c23238b1d821c0ef5afb4f1f54b5b5"; // Replace with your OpenWeatherMap API key
const container = document.getElementById('container');
const cityName = document.getElementById('city-name');
const cityNameError = document.getElementById('city-name-error');
const result = document.getElementById('result');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather')

const getWeatherButton = document.getElementById('get-weather-button');
getWeatherButton.addEventListener('click', async () => {
    result.innerHTML='';
    temp.innerHTML='';
    weather.innerHTML=``;

    const city = cityName.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    if (city.length < 1) {
        setTimeout(() => {
            cityNameError.textContent = '';
        }, 3000);
        cityNameError.textContent = "Please provide your city name";
        return
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        console.log(`🌍 Location: ${data.name}`);
        temp.innerHTML=`Tempature <p>${data.main.temp}°C</p>`;
        const description = data.weather[0].description;
        weather.innerHTML=`<p>Weather ${description}</p>`
console.log(description);
         if(description=="clear sky"){
          result.innerHTML=`<img src="../../AeroCast/assets/images/clear-sky.png" alt="Claer image">`;
        }else if(description=="	few clouds"){
            result.innerHTML=`<img src="../../AeroCast/assets/images/clouds.png" alt="cloud image">`;
        }else if(description=="scattered clouds"){
            result.innerHTML=`<img src="../../AeroCast/assets/images/haze.png" alt="scattered image">`;
        }else if(description=="broken clouds"){
            result.innerHTML=`<img src="../../AeroCast/assets/images/haze.png" alt="broken clouds image">`;
        }else if(description=="shower rain"){
              result.innerHTML=`<img src="../../AeroCast/assets/images/rain.png" alt="broken clouds image">`;
        }else if(description=="rain"){
             result.innerHTML=`<img src="../../AeroCast/assets/images/rain.png" alt="broken clouds image">`;;
        }else if(description=="thunderstorm"){
              result.innerHTML=`<img src="../../AeroCast/assets/images/scattered-thunderstorms.png" alt="broken clouds image">`;
        }else if(description=="snow"){
             result.innerHTML=`<img src="../../AeroCast/assets/images/snowflake.png" alt="snowflake clouds image">`;
        }else if(description=="mist"){
             result.innerHTML=`<img src="../../AeroCast/assets/images/thunderstorm.png" alt="thunderstorm clouds image">`;
        }else if(description=="overcast clouds"){
            result.innerHTML=`<img src="../../AeroCast/assets/images/clouds.png" alt="overcast clouds image">`;
        }

       

        console.log(`${data}`);
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        if (error.message.includes('City not found!')) {
            cityNameError.textContent = "We couldn't find your city";
            setTimeout(() => {
                cityNameError.textContent = '';
            }, 3000);
        }else{
            cityNameError.textContent = `${error.message}`;
            setTimeout(() => {
                cityNameError.textContent = '';
            }, 3000);
        }

    }
});



