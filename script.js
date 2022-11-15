var locationInput = document.getElementById('location'); //input receiver
var submitBtn = document.querySelector('.submit');
var clearBtn = document.querySelector('.clearhistory')

//current weather and day
var currentDay = document.getElementById('currentDay');
var currentPicEl = document.querySelector(".currentweatherpic");
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidEl = document.getElementById('humidity');

//history
var searchHistory = JSON.parse(localStorage.getItem(city)) || []
var list = document.getElementById('list');

//TEST
function getWeatherTest() {
    const key = "c7ba7bc8408fa41cc63b35a10d55f11f"
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + "Denver" + "&APPID=" + key + "&units=imperial";
    fetch(url)
    .then((response) => response.json())
    .then(response => {
        console.log(response)
    })
}
getWeatherTest()

//getting weather
function todayWeather (cityName) {
    const APIkey = "c7ba7bc8408fa41cc63b35a10d55f11f"; 
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIkey + "&units=imperial";
    fetch(requestURL)
    .then((response) => response.json())
    .then(response => {
        console.log(response)
        cityEl.innerHTML = response.name //shows "undefined", added if statement to get rid of it 
        if (cityName === undefined) {
            cityEl.innerHTML = "City";
        }
        tempEl.innerHTML = "Temp: " + response.main.temp + "F";
        windEl.innerHTML = "Wind: " + response.wind.speed + " MPH";
        humidEl.innerHTML = "Humidity: " + response.main.humidity  + "%";

        let weatherPic = response.weather[0].icon; //doesn't work above temp/wind/humidity ? 
        currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPicEl.setAttribute("alt", response.weather[0].description);
        

    })
    //goes under city name; not part of fetch
    var today = moment();
    $('#date').text(today.format('L'));

    //five day section 
    //url error :(
    let forecastURL =  "api.openweathermap.org/data/2.5/forecast?id=" + cityName + "&appid=" + APIkey; 
    fetch(forecastURL)
    .then((response) => response.json())
    .then(response => {
        console.log(response)
        var forecastEl = document.querySelector('.future'); 
        for (i = 0; i < forecastEl; i++) {
    //         var forecastIndex = i * 8 + 4;
    //         var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
    //         var forecastDay = forecastDate.getDate();
    //         var forecastMonth = forecastDate.getMonth() + 1;
    //         var forecastYear = forecastDate.getFullYear();
    //         var forecastDateEl = document.createElement("h5");
    //         forecastDateEl.setAttribute("class", "forecastdate")
    //         forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
    //         forecastEl[i].append(forecastDateEl);

    //commenting out until url works 
            // forecastTempEl = document.createElement("p");
            // forecastTempEl.innerHTML = "Temp: " + response.data.list[forecastIndex].main.temp;
            // forecastEl[i].append(forecastTempEl);
            // forecastHumidEl = document.createElement("p");
            // forecastHumidEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
            // forecastEl[i].append(forecastHumidEl);
            // forecastWindEl = document.createElement("p");
            // forecastWindEl.innerHTML = "Wind Speed: " + response.data.list[forecastIndex].wind.speed;
            // forecastEl[i].append(forecastWindEl);
        }
    })
}
console.log(localStorage)

//creating search history
function renderSearchHistory () {
    list.innerHTML = "";
    for(let i = 0; i < searchHistory.length; i++) {
        const historyInput = document.createElement("input")
        historyInput.setAttribute("type", "text")
        historyInput.setAttribute("readonly", true) //prevents text from being changed 
        historyInput.setAttribute("value", searchHistory[i]) //gets objects from search history
        historyInput.style.listStyle = "none" //css
        historyInput.style.width = "100%" //css
        historyInput.addEventListener("click", function() {
            todayWeather(historyInput.value) 
        }) //event listener that selects search history on click
        list.append(historyInput) //creates the search history list 
    }
}

//searches 
submitBtn.addEventListener('click', function() {
    const searchedCity = locationInput.value //gets value from input 
    todayWeather(searchedCity) //puts value to todayWeather function
    searchHistory.push(searchedCity) //searchedCity becomes part of searchHistory
    localStorage.setItem("city", JSON.stringify(searchHistory)) //added to local storage
    renderSearchHistory() //adds to history list
});

//clears search history 
clearBtn.addEventListener('click', function() {
    searchHistory = []
    renderSearchHistory()
    localStorage.clear //clear local storage
})

todayWeather()
