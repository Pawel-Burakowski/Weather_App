let lat;
let long;
const apiKey = "fc8a25f603fee714c560352a94de2bc5"

function startApp() 
{
    if(navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                
                console.log("lat:", lat, "long:", long);

                getWeatherData();
            }
        );
    }
}

function getWeatherData() 
{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url).then( function(response)
    {
        response.json().then( function(data)
        {
            console.log(data);
            updateWeatherData(data)
        } );
    });
}

function updateWeatherData(data)
{
    const temp = data.main.temp + ("<sup>&deg;</sup>");
    const pressure = data.main.pressure + (" hPa");
    const minTemp = data.main.temp_min + ("<sup>&deg;</sup>");
    const maxTemp = data.main.temp_max + ("<sup>&deg;</sup>");
    const moisture = data.main.humidity + (" %")
    const weatherDescription = data.weather[0].description;

    document.getElementById("temp").innerHTML = temp;
    document.getElementById("pressure").innerHTML = pressure
    document.getElementById("minTemp").innerHTML = minTemp;
    document.getElementById("maxTemp").innerHTML = maxTemp;
    document.getElementById("maxTemp").innerHTML = maxTemp;
    document.getElementById("moisture").innerHTML = moisture;

    let imgUrl = "http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png";
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);

    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;
    locationLink.href = `https://openstreetmap.org/#map=9/${lat}/${long}`;
}