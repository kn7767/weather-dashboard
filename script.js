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
//5 day forecast
    let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + "Denver" + "&appid=" + key; 
    fetch(forecast)
    .then((response) => response.json())
    .then(response => {
        console.log(response)    
    })
};
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
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey + "&APPID=" + APIkey + "&units=imperial";
    fetch(forecastURL)
    .then((response) => response.json())
    .then(response => {
        console.log(response)
        var forecast1 = document.querySelector('.day1'); 
        var forecast2 = document.querySelector('.day2'); 
        var forecast3 = document.querySelector('.day3'); 
        var forecast4 = document.querySelector('.day4'); 
        var forecast5 = document.querySelector('.day5');
        
        //day 1 forcast
        let icon1 = response.list[0].weather[0].icon;
        var iconEl1 = document.createElement("img");
        iconEl1.setAttribute("src", "https://openweathermap.org/img/wn/" + icon1 + "@2x.png");
        iconEl1.setAttribute("alt", response.list[0].weather[0].description);
        forecast1.append(iconEl1);

        var tempEl1 = document.createElement("p");
        var windEl1 = document.createElement("p");
        var humidEl1 = document.createElement("p");

        tempEl1.innerHTML = "Temp: " + response.list[0].main.temp + "F";
        forecast1.append(tempEl1)
        windEl1.innerHTML = "Wind: " + response.list[0].wind.speed + " MPH";
        forecast1.append(windEl1)
        humidEl1.innerHTML = "Humidity: " + response.list[0].main.humidity + "%";
        forecast1.append(humidEl1)
        
        //day 2 forecast
        var iconEl2 = document.createElement("img");
        let icon2 = response.list[1].weather[0].icon;
        iconEl2.setAttribute("src", "https://openweathermap.org/img/wn/" + icon2 + "@2x.png");
        iconEl2.setAttribute("alt", response.list[0].weather[0].description);
        forecast2.append(iconEl2);

        var tempEl2 = document.createElement("p");
        var windEl2 = document.createElement("p");
        var humidEl2 = document.createElement("p");

        tempEl2.innerHTML = "Temp: " + response.list[1].main.temp + "F";
        forecast2.append(tempEl2)
        windEl2.innerHTML = "Wind: " + response.list[1].wind.speed + " MPH";
        forecast2.append(windEl2)
        humidEl2.innerHTML = "Humidity: " + response.list[1].main.humidity + "%";
        forecast2.append(humidEl2)

        //day 3 forecast  
        var iconEl3 = document.createElement("img");
        let icon3 = response.list[2].weather[0].icon;
        iconEl3.setAttribute("src", "https://openweathermap.org/img/wn/" + icon3 + "@2x.png");
        iconEl3.setAttribute("alt", response.list[2].weather[0].description);
        forecast3.append(iconEl3);

        var tempEl3 = document.createElement("p");
        var windEl3 = document.createElement("p");
        var humidEl3 = document.createElement("p");

        tempEl3.innerHTML = "Temp: " + response.list[2].main.temp + "F";
        forecast3.append(tempEl3)
        windEl3.innerHTML = "Wind: " + response.list[2].wind.speed + " MPH";
        forecast3.append(windEl3)
        humidEl3.innerHTML = "Humidity: " + response.list[2].main.humidity + "%";
        forecast3.append(humidEl3)

        //day 4
        var iconEl4 = document.createElement("img");
        let icon4 = response.list[3].weather[0].icon;
        iconEl4.setAttribute("src", "https://openweathermap.org/img/wn/" + icon4 + "@2x.png");
        iconEl4.setAttribute("alt", response.list[3].weather[0].description);
        forecast4.append(iconEl4);

        var tempEl4 = document.createElement("p");
        var windEl4 = document.createElement("p");
        var humidEl4 = document.createElement("p");

        tempEl4.innerHTML = "Temp: " + response.list[3].main.temp + "F";
        forecast4.append(tempEl4)
        windEl4.innerHTML = "Wind: " + response.list[3].wind.speed + " MPH";
        forecast4.append(windEl4)
        humidEl4.innerHTML = "Humidity: " + response.list[3].main.humidity + "%";
        forecast4.append(humidEl4)

        //day5
                
        var iconEl5 = document.createElement("img");
        let icon5 = response.list[4].weather[0].icon;
        iconEl5.setAttribute("src", "https://openweathermap.org/img/wn/" + icon5 + "@2x.png");
        iconEl5.setAttribute("alt", response.list[4].weather[0].description);
        forecast5.append(iconEl5);

        var tempEl5 = document.createElement("p");
        var windEl5 = document.createElement("p");
        var humidEl5 = document.createElement("p");

        tempEl5.innerHTML = "Temp: " + response.list[4].main.temp + "F";
        forecast5.append(tempEl5)
        windEl5.innerHTML = "Wind: " + response.list[4].wind.speed + " MPH";
        forecast5.append(windEl5)
        humidEl5.innerHTML = "Humidity: " + response.list[4].main.humidity + "%";
        forecast5.append(humidEl5)
     })
}
// //creating search history
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
