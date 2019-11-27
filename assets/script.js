// Pseudo Code
/* * Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

* Use Axios to hook into the API to retrieve data in JSON format.

* Display the following under current weather conditions:
  * City
  * Date
  * Icon image (visual representation of weather conditions)
  * Temperature
  * Humidity
  * Wind speed
  * UV index
* Include a search history so that users can access their past search terms. Clicking on the city name should perform a new search that returns current and future conditions for that city. 

* Include a 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast should display the following:
  * Date
  * Icon image (visual representation of weather conditions)
  * Temperature
  * Humidity

### Hints

* Create multiple functions within your application to handle the different parts of the dashboard:
  * Current conditions
  * 5-Day Forecast
  * Search history
  * UV index
* You will need to make more than one Axios call.
* You will need to hardcode some of the parameters in the API's URL. User input will determine some of the other parameters.
* Use `localStorage` to store any persistent data.

*/

// add event listener to search button
// add axios call for city mentioned in search
// add search into local storage
// retrieve from local storage to add to a cities array to display in a button in a cityRow in firstColumn
// add axios call for 5 day forecast for current searched city to display in second row of second column

const searchBtn = document.getElementById("button-search-city");
const inputCity = document.getElementById("input-city");
const currentCitySpaceEl = document.getElementById("currentWeatherDiv");
let currentCity = inputCity.value

const tempDisplay = document.getElementById("temperatureSpace-js");
const HumidDisplay = document.getElementById("humiditySpace-js");
const windDisplay = document.getElementById("windSpace-js");
const uvDisplay = document.getElementById("uvSpace-js");

let date = moment().format('LL');
// console.log(date);

function searchCity() {
    searchBtn.addEventListener("click", function () {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&units=imperial&appid=2b0a8c513905263b5387153b0ed5df1f";
        // console.log(inputCity.value);
        // console.log(queryURL);
        axios.get(queryURL)
            .then(function (response) {

                // console.log(queryURL)
                console.log(response);
                // console.log("wind:", response.data.wind.speed);
                // console.log("humidity:", response.data.main.humidity);
                // console.log("temperature:", response.data.main.temp);
                // console.log("name", response.data.name);
                // console.log("date", response.data.dt);
                // console.log("icon", response.data.weather[0].icon);


                const cityStr = localStorage.getItem("city-ls") || "[]";
                const cities = JSON.parse(cityStr);
                cities.push(response.data.name);
                localStorage.setItem("city-ls", JSON.stringify(cities));
                let cityName = response.data.name;
                let temp = response.data.main.temp;
                let humid = response.data.main.humidity;
                let wind = response.data.wind.speed;
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;

                // console.log(localStorage);
                // console.log(cities);
                createCityBtns(cities)
                displayCurrent(cityName)

                function createCityBtns(cities) {

                    cityBtnSpaceEl = document.getElementById("cityBtnSpace")
                    cityBtnSpaceEl.innerHTML = "";

                    for (i = 0; i < cities.length; i++) {
                        const cityBtnEl = document.createElement("button");
                        cityBtnEl.setAttribute("class", "cityRow mb-1")
                        cityBtnEl.innerHTML = cities[i];
                        cityBtnSpaceEl.append(cityBtnEl);
                        cityBtnEl.addEventListener("click", function () {
                            cityName = cityBtnEl.innerHTML;
                            console.log(cityName);
                            displayCurrent();
                        });
                    };
                };
function displayForecast(){ 

}

                function displayCurrent() {
                    const currentCityEl = document.createElement("div");
                    currentCityEl.setAttribute("class", "currentCity mb-2");
                    currentCitySpaceEl.innerText = ""
                    currentIcon = response.data.weather[0].icon;
                    currentCityEl.innerHTML = cityName + " " + " -- " + " " + date + "<img src = 'https://openweathermap.org/img/wn/" + currentIcon + "@2x.png'></img>";
                    currentCitySpaceEl.append(currentCityEl);


                    tempDisplay.innerHTML = "Temperature: " + temp + " F°"
                    HumidDisplay.innerHTML = "Humidity: " + humid + "%"
                    windDisplay.innerHTML = "Wind Speed: " + wind + " mph"

                    let uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2b0a8c513905263b5387153b0ed5df1f"

                    axios.get(uvQueryURL)
                        .then(function (response) {
                            // console.log(response);
                            let uvIndex = response.data.value;
                            uvDisplay.innerHTML = "UV Index: " + uvIndex;
                        })



                };
            })
    });



};
searchCity()